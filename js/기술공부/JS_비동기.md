# JS의 비동기 구현에 대해

## JS는 싱글 쓰레드다?
싱글 쓰레드 언어라고 불리는 이유는 call stack이 하나이기 때문

## 비동기 프로그래밍 특징
JS는 하나가 모든 일을 담당하는 싱글 쓰레드의 단점을 회피하기 위해
비동기 프로그래밍을 사용.

DB 조회나, HTTP요청 등 시간비용이 큰 작업들은 다른 스레드로 위임하고 계속 진행합니다.

이것이 논 블로킹이라고 하는데 위임시키는 대상은 API라는 곳인데, 브라우저에선 WEBAPI, NODE에선 NODE API 라고 부르는 별개의 스레드 영역입니다.

위임시킨 일을 기다리지 않고 다른 일로 진행하는 것. 

다른 스레드에게 던진 일이 끝나면 그 시간비용이 큰 작업이 마저 해야할 것을 처리할 수 있게
소스 순회하는 스레드가 알 수 있게끔 이벤트로 알려주는 시스템을 **이벤트 기반 아키텍처**라고 부른다.

이벤트 기반 아키텍처의 과정은
1. 처리된 일을 Event Queue에 들어가고 대기
2. 제어 스레드가 일을 마쳐서 callStack에서 실행할 게 없어지면
3. Event Loop는 Event Queue에 있는 일을 하나 꺼내서 CallStack에 집어 넣어 실행.

## 비동기 처리방식 3가지

### CallBack
비동기를 호출하는 함수를 호출하며 콜백함수를 넘겨 함수 결과 뒤의 로직을 구성 할 수 있다.

```js
   const add10 = (a, cb) => {
      setTimeout(() => {
         cb(a + 10)
      }, 1000);
   }

   // 콜백으로 여러건의 비동기를 구현

   let t1 = add10(5, result => { // add10 안에서 5 + 10한 값이
      add10(result, res =>{   // 첫 번째 인자인 result에 들어간다
         add10(result, res =>{  
            console.log(res)    // 약 3초 뒤에 35가 출력됨.
         })
      })
   })

   //지금은 딱 3건의 CallBack Wrap만 있지만 수백개가 된다면 계속 안쪽으로 들어가는  CallBack hell 을 구성하게 된다.


   let t1 = add10(5, result => { // add10 안에서 5 + 10한 값이
      add10(result, res =>{   // 첫 번째 인자인 result에 들어간다
         add10(result, res =>{  
            return res    // 약 3초 뒤에 35가 출력됨.
         })
      })
   })

   //그리고 t1을 리턴받아보면 undefined가 나오게 된다. t1은 추후에 사용할 수 없는 값이 되는데
   // 밑에 나올 Promise는 값으로 표현해서 추후 작업을 할 수 있다는 것이다.

   // 함수를 감싸서 없던 공간 만들기

   function wrap(fn) { // (1) 함수 받기
      return function() { // (2) 함수 리턴하기
         // 여기에 새로운 공간이 생김 나중에 함수를 실행했을 때 이 부분을 거쳐감
         return fn.apply(null, arguments) // (3)
      }
   }

   let add = wrap(function(a, b, cb) {
      setTimeout(() => {
         cb(a + b)
      }, 1000)
   })

   add(10, 5, console.log) // 약 1초 후 15

   // wrap :: (1)에서 받은 함수를 기억하는 (2)클로저를 만들어 리턴했고, add는 (2)가 된다.
   // 나중에 (2)가 실행되면 (1)에서 받아 둔 (3)함수를 실행하면서 (2)가 받은 모든 인자를 넘겨 준다.

   wrap을 조금만 더 고치고 _async라고 이름을 바꿔보자.

   const _async = (fn) => {
      return function() {
         arguments[arguments.length++] = function(result) { // (1)
            _callback(result) // (6)
         }
         fn.apply(null, arguments) // (2)

         var _callback; // (3)
         function _async_cb_receiver(cb) { // (4)
            _callback = cb // (5)
         }
         return _async_cb_receiver
      }
   }

   let add = _async((a, b, cb) => {
      setTimeout(() => {
         cb(a, b)
      }, 1000)
   })

   add(10, 5)((r) => console.log(r)) // (7) 커링하듯이 한번 더 실행하면서 callback함수를 넘기고있다.
   // 약 1초 뒤 15

   console.log(add(add(add(10, 10), 10), 10)) // 비동기 코드임에도 이렇게 사용할 수 있게 만들게 고쳐보자.

   const _async = (fn) => {
      return function() {
         arguments[arguments.length++] = function(result) { // (1)
            _callback(result); // (6)
         }; // 여기서 세미콜론 안하면 _callback not function 에러 난다.

         (function wait(args) {
            // 새로운 공간 추가
            for (let i = 0; i < args.length; i++) 
               if (args[i] && args[i].name == '_async_cb_receiver') 
                  return args[i]((arg) => { args[i] = arg; wait(args); })
            fn.apply(null, args)
         })(arguments)

         var _callback;    
         function _async_cb_receiver(callback) {
            _callback = callback;
         }
        return _async_cb_receiver;
      }
   }



```
_async
1. add가 실행되면 인자로 10, 5가 넘어오고, 원래는 callback 함수를 받아야 하므로 arguments에 마지막 값으로 함수를 추가한다. 그리고 그 함수는 나중에 개발자가 넘겨준 callback함수를 실행할 수 있게 준비해 두었따.
2. add를 정의할 때 받아 둔 fn을 실행하면서 인자 3개를 넘긴다
3. _callback이라는 지역 변수를 만들어서 (1)과 (4)가 기억해 두도록 했고, 클로저를 활용하여 서로 다른 컨텍스트가 협업할 수 있도록 이어주었다.
4. _async_cb_receiver라는 이름을 가진 유명 함수 클로저를 만들어 리턴한다.
5. _async_cb_receiver가 실행될 때 받은 함수 callback을 _callback에 할당한다.
6. 1초가 지나면 (1)이 실행될 것이고 add가 callback을 통해 넘긴 결과인 result를 받아두었던 _callback을 실행하면서 다시 넘겨주고 있다.
7. 이 익명함수가 _callback이므로 (6)에서 넘겨진 r을 받게 되고 로그를 남겼다.

이제 _async 함수는 콜백 패턴을 사용하는 비동기 함수를 받아, 한 번 더 실행하여 결과를 받는 함수로 변경해 주는 함수가 되었다.
---

### Promise

ES6부터 Promise를 표준으로 채택했다.

#### 비동기를 값으로 표현
Promise의 가장 큰 특징은 비동기 상황을 하나의 객체로 표현

1. pending
   
   resolve(성공)나 reject(실패)를 하지 않은 상태
2. fulfilled

   resolve가 호출되어 값을 넘길 수 있는 상태 (then 사용가능)
3. rejected

   reject가 호출되어 값을 넘길 수 있는 상태 (catch 사용가능)

#### 메서드 체이닝

```js
   const promiseAdd10 = (a) => new Promise(resolve => setTimeout(() => resolve(a + 10), 1000)) 

   let t2 = promiseAdd10(5)
      .then(promiseAdd10)
      .then(promiseAdd10)
      .then(console.log) // 약 3초뒤에 35 출력

   console.log(t2) // Promise {<resolved>: 35}

   // callback과는 다르게 t2를 값으로 사용할 수 있다,
```

#### 병렬처리

비동기를 값으로 다룰 수 있다는 것은 비동기 제어를 쉽게 할 수 있다는 것.

```js

const promiseAdd100 = (a) => new Promise(resolve => setTimeout(() => resolve(a + 100), 1000)) 

Promise.all([promiseAdd10(5), promiseAdd100(5)])
   .then(([r1,r2]) => {
      console.log(r1, r2) // 약 1초뒤 15, 105
})
```
---

### rejected

reject는 일반적으로 예외, 에러 상황에서 발생.
then의 두 번째 함수 rejected 함수와 catch로 처리할 수 있는데
rejected가 안좋은 점이 있다.

```js
   const p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject('reject: p1'), 3000);
})
const p2 = (param) => new Promise(resolve => {
  setTimeout(() => resolve(`${param}, resolve: p2`), 5000);
});

p1.then(r1 => {
  console.log('after p1 resolve');
  return p2(r1);
}, e1 => {
  console.log('after p1 reject');
  console.log(e1);
}).then(r2 => {
  console.log('after p2 resolve');
  console.log(r2);
}, e2 => {
  console.log('after p2 reject');
});

```

출력 after p1 reject -> reject: p1 -> after p2 resolve -> undefined

대게 에러나 예외가 나면 그 부분을 제외하고 출력하거나 건너뛰는것을 생각할 수 있는데

after p1 reject -> reject: p1

혹은

after p1 reject -> reject: p1 -> after p2 reject -> ...

처럼 rejected는 undefined가 나와도 그대로 진행하게 되어있다 그래서...


#### catch

```js
   const p1 = new Promise((resolve, reject) => {
      setTimeout(() => reject('reject: p1'), 3000);
   })
   const p2 = new Promise(resolve => {
      setTimeout(() => resolve("resolve: p2"), 5000);
   });

   p1.then(r1 => {
      console.log('after p1 resolve');
      return p2(r1);
   })
   .then(r2 => {
      console.log('after p2 resolve');
      console.log(r2);
   })
   .catch(e => {
      console.log('after reject');
      console.log(e);
   })

   // p1에서 reject를 콜백(?)으로 실행하기 때문에 catch로 넘어온다
   // 출력 reject: p1 -> after reject
```

#### reject말고 catch를 권장하는 이유

1. 예외 처리 같은 reject 로직을 뒤에서 작성할 수 있습니다.
2. 중간에 섞인 rejected 함수 사용 로직보다 가독성이 좋다
3. reject 상황을 뒤에 배치하여 then 체이닝으로 이어서 로직 작성 가능
4. 무엇보다 then fulilled 로직에서 발생하는 에러를 잡아줄 수 있다.

``` js 
//4 번 예시
   const pp1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve('resolve: p1'), 3000);
   })

   pp1.then(r1 => {
    console.log(r1)
      }).then(r2 => { //resolve에서 에러가 났을때 throw catch에게 던져 대처가 가능하다.
         throw new Error('error') 
         console.log(r2)
      }).catch(e => {
         console.log('errrrrrrrrrrrr')
      })

      // 출력 resolve: p1 -> errrrrrrrrrrrr
```

### async / await

ES8부터 적용된 비동기 처리방식

```js
   const test = async(id) => {
      const userList = await db.query('select * from userlist where id = ?', id);
      //시간 비용이 큰 작업 앞에 await를 붙여주면 된다.
   }
   test(123) //
   console.log(test(10)) // Promise

```

[MDN async function 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

참고 https://velog.io/@thsoon/JS-%EB%B9%84%EB%8F%99%EA%B8%B0%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B5%AC%ED%98%84%EB%90%98%EC%96%B4%EC%9E%88%EB%8A%94%EA%B0%80