> 1\. 삼항조건 연산자 (The Ternary Operator)

> let x = 20;  
> const y = x > 10 ? "yes" : "no"; // "yes"

> 2\. 간략계산법 (Short-circuit Evaluation)

> if (variable1 !== null || variable1 !== undefined || variable1 !== '') {  
>    let variable2 = variable1;  
> }  
> const variable2 = variable1 || 'new';

경험 많은 개발자들은 그래서 비용이 높은 코드는 가능한 한 나중에 평가되도록 작성한다.

OR연산자를 사용할 땐 true를 리턴할 가능성이 높은 코드를 첫 번째 조건으로 작성하고

AND연산자에선 false를 첫번째로.

인용: [http://milooy.github.io/TIL/JavaScript/short-circuit.html#%EC%98%88%EC%A0%9C](http://milooy.github.io/TIL/JavaScript/short-circuit.html#%EC%98%88%EC%A0%9C)

> 3\. 변수 선언

> let x;  
> let y = 3;  
> let x, y=3; //축약

> 4\. If Presence

> if (likeJavaScript === true)  
> if (likeJavaScript) //축약

약간의 차이점은 축약기법의 if 문은 condition이[truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)일 경우 통과, 기존 if 문은 condition이 TRUE 일때만 통과.

> 5\. For 루프

> for (let i = 0; i < allImgs.length; i++)  
> for (let index of allImgs) //축약기법

> 6\. 십진수 지수 (Decimal base exponents)

> for (let i = 0; i < 1e1; i++)  
> 1e0 === 1;  
> 1e1 === 10;  
> 1e2 === 100;  
> 1e3 === 1000;

> 7\. 객체 프로퍼티

> const obj = { x:x, y:y };  
> const obj = { x, y }; //x : x 같이 Key, Value가 같으면 축약 가능

> 8\. 애로우(화살표) 함수

> list.forEach(function(item) { console.log(item); });  
> list.forEach(item => console.log(item)); // 축약
>
> sayhello = name => console.log('name') // 축약

> 9\. 묵시적 반환(Implicit Return)

> function calcCircumference(diameter) {  
>    return Math.PI \* diameter  
> }
>
> calcCircumference = diameter => Math.PI \* diameter

> 10\. 파라미터 기본 값 지정하기(Default Parameter Values)

> function volume(l, w, h) {  
> if (w === undefined) w = 3;  
> if (h === undefined) h = 4;  
>    return l \* w \* h;  
> }
>
> volume = (l, w = 3, h = 4 ) => (l \* w \* h); //축약

> 11\. 템플릿 리터럴 (Template Literals, 백틱)

> const welcome = 'You have logged in as ' + first + ' ' + last + '.'  
> const welcome = \`You have logged in as ${first} ${last}\`; //축약

> 12\. 비구조화 할당 (Destructuring Assignment, 구조분해 할당)

> const observable = require('mobx/observable');  
> const action = require('mobx/action');  
> const runInAction = require('mobx/runInAction');
>
> import { observable, action, runInAction } from 'mobx'; //축약

> 13\. 여러줄로 문자열 쓰기 (Multi-line String)

11. 템플릿 리터럴 (Template Literals, 백틱) 사용하면 여러줄 처리 가능

> 14\. 전개 연산자 (Spread Operator)

> const odd = \[1, 3, 5\];  
> const nums = \[2 ,4 , 6\].concat(odd);
>
> const odd = \[1, 3, 5 \];  
> const nums = \[2 ,4 , 6, ...odd\]; //축약

> 15\. 필수(기본) 파라미터 (Mandatory Parameter)

> function foo(bar) {  
>    if(bar === undefined) {  
>       throw new Error('Missing parameter!');  
>    }  
> return bar;  
> }
>
> //축약기법  
> mandatory = () => throw new Error('Missing parameter!');   
> foo = (bar = mandatory()) =>  return bar;

> 16\. Array.find

> const pets = \[  
>    { type: 'Dog', name: 'Max'}, { type: 'Cat', name: 'Karl'}, { type: 'Dog', name: 'Tommy'},  
> \]
>
> function findDog(name) {  
>    for(let i = 0; i<pets.length; ++i) {  
>       if(pets\[i\].type === 'Dog' && pets\[i\].name === name) {  
>          return pets\[i\];  
>       }  
>    }  
> }

> 17\. Object \[key\]

Foo.bar 를 Foo\[‘bar’\] 로 적을 수 있는걸 알고 있나요?

왜 후자와 같이 코딩을 해야하는지 의문이 들 수도 있겠지만,

재사용이 용이한 코드 블럭을 작성하기 위해서는 매우 효율적인 방법입니다.

```
function validate(values) {
  if(!values.first)
    return false;
  if(!values.last)
    return false;
  return true;
}

console.log(validate({first:'Bruce',last:'Wayne'})); // true
```

위 함수로 validation기능을 완벽하게 사용할 수 있습니다. 하지만 form 요소들과 validation 옵션으로 사용해야하는

영역과 규칙(fields and rules)이 많을 경우 위의 함수는 점점 복잡해지고 길어지게 됩니다.

이를 방지하기 위해서 실행시 옵션을 부과할 수 있는 포괄적인 validation 함수를 작성하는 방법을 알아보겠습니다.

```
// object validation rules (객체로 만든 validation 규칙)
const schema = {
  first: {
    required:true
  },
  last: {
    required:true
  }
}

// universal validation function (공통적으로 사용할 수 있는 validation 함수)
const validate = (schema, values) => {
  for(field in schema) {
    if(schema[field].required) {
      if(!values[field]) {
        return false;
      }
    }
  }
  return true;
}

console.log(validate(schema, {first:'Bruce'})); // false
```

> 18\. 단항 비트 논리부정 연산자 (Double Bitwise NOT)

비트 연산자는 자바스크립트 공부를 시작하면서 한번 배운뒤 한번도 적용해본적 없는 연산자일 겁니다.

애당초 이진법으로 코딩하지 않는다면 1 과 0 을 사용 할 일이 없죠.

하지만 이번 팁은 단항 비트 논리부정 연산자를 효율적으로 사용할 수 있는 방법을 알려드립니다.

Math.floor() 함수의 대체용으로 사용할 수 있다는 것이죠. 또 Math.floor() 함수보다 훨씬 빠르게 작동합니다.

> Math.floor(4.2) // 4
>
> ~~4.2 // 4

출처: [https://chanspark.github.io/2017/11/28/ES6-%EA%BF%80%ED%8C%81.html](https://chanspark.github.io/2017/11/28/ES6-%EA%BF%80%ED%8C%81.html)
