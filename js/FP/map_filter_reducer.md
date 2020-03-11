## map

```js
   const products = [
      {name: '반팔티', price: 15000},
      {name: '긴팔티', price: 20000},
      {name: '핸드폰케이스', price: 15000},
      {name: '후드티', price: 30000},
      {name: '바지', price: 25000}
   ];

   const map = () => {
      const productName = [];
      for(const a of products) {
         productName.push(a.name);  //개발자가 어떤 값(a.price)을 (productPrice에)수집 할 거라고 명령형으로 선언
      }  
      console.log(productName); //["반팔티", "긴팔티", "핸드폰케이스", "후드티", "바지"], 부수 효과
   }

   //map 함수를 수정하여 부수효과를 제거하고 로직 개선

   const map = (iter) => {  // iter라고 지은 이유 : map 함수의 인자 iter는 이터러블 프로토콜을 따른다고 명시.
      const arr = [];
      for(const a of iter) {
         arr.push(a.name);
      }
      return arr;
   } // 받은 product의 name만 배열에 담아 리턴 부수효과 제거

   console.log(map(products)) // ["반팔티", "긴팔티", "핸드폰케이스", "후드티", "바지"]

   // 여기서 더 나아가 map함수의 인자로 함수를 받아 유연성 증가.
   // 함수를 값으로 받는 고차함수이기도 하다.
   const map = (f, iter) => {
      const arr = [];
      for(const a of iter) {
         arr.push(f(a)); // 함수를 인자로 받아 arr.push에서 해야할 일을 함수에게 완전히 위임. 
      }
      return arr;
   }

   console.log(map(p => p.name, products)) // ["반팔티", "긴팔티", "핸드폰케이스", "후드티", "바지"]
   console.log(map(p => p.price, products)) // [15000, 20000, 15000, 30000, 25000]
   // 함수형 프로그래밍에선 map이라는 함수에 보조함수(p => p.name)를 통해 두번째 인자인 배열 또는 이터러블에 어떠한 값을 수집한다고 보조함수를 전달하는 식으로 진행된다.

```

## 이터러블 프로토콜을 따른 map의 다형성

```js
   const = nodeEl = document.querySelectorAll('*');
   console.log(nodeEl) // [html, head, ...] 배열처럼 생겼다. 하지만 array를 상속받은 객체가 아니다.

   nodeEl.map // prototype에 map함수가 정의되어 있지 않다.

   map(el => el.nodeName, nodeEl) // ["HTML", "HEAD", "META" ...
   //위에서 만든 map함수는 정상적으로 동작한다. document.querySelectorAll('*')가 이터러블 프로토콜을 따르기 때문.

   console.log(document.querySelectorAll('*')[Symbol.iterator]()) // Array Iterator {}
 
   function *gen() {
      yield 1;
      yield 2;
      yield 3;
   }

   map(a => a * a, gen()); // [1, 4, 9]; 제너레이터 함수의 yield 값도 적용이 가능하다.

```
사실상 모든 것들에 위에서 만든 map을 적용시킬 수 있다.
 
ecma script에서 계속 이터러블 프로토콜을 따르게 만들어질텐데,
이터러블 프로토콜을 따르는 함수들을 사용하는것은 많은 헬퍼 함수들과의 조합성이 좋아진다.

프로토 타입기반, 클래스 기반으로 사용하는 방법보다 유연성이 좋아진다고 말할수 있다.

## filter