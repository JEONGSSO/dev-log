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
   // 바로 밑에 나올 Promise는 값으로 표현해서 추후 작업을 할 수 있다는 것이다.
```
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
