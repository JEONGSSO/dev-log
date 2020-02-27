# typeScript 기초
```shell
   npm i typescript

   tsc -init // tsconfig.json 생성됨.
```

```json

package.json에 스크립트를 만들어준다
...
   "sciprt": {
      "build": "tsc"
   }
...

```

## tsconfig.json 
타입스크립트가 컴파일 될때 필요한 옵션을 지정.

target: 컴파일된 코드가 어떤환경에서 실행될 지 정의.
   - 예를들어 es5로 한다면 화살표함수를 function 키워드로 변환해준다. 

module: 컴파일된 코드가 어떤 모듈 시스템을 사용할지 정의.
   - common으로 설정하면, export default 구문(?)이 exports.default 으로 변환된다.
   - es2015로 설정하면, 그대로 진행된다.
strict: 모든 타입 체킹 옵션 활성화.
esModuleInterop: commonjs 모듈 형태로 이루어진 파일을 es2015 형태로 불러올 수 있게 해줍니다.

~ 옵셔널 ~
outDir: 컴파일된 파일들이 저장되는 경로 지정.

등등 이외에도 많다.
https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

------

## ts 파일 만들기(test.ts)
```ts
// test.ts
//확장자를 ts로 해준다음 사용할 수 있다.

const message: string = 'hello world';
console.log(message);

```

message 값이 선언된 코드를 보면 :string이라고 명시해주었는데 이는 상수 message의 자료형이 string이라는것을 명시한것.

그 후 package.json에서 선언한 스크립트를 실행.
npm run build -> outDir에서 지정해준 폴더에 컴파일 된 파일이 생긴다.

```js
   "use strict";
   var message = 'hello world';
   console.log(message);
```

## 기본타입

```ts
   //다른 자료형으로 재 할당시 에러.
   let count = 1;
   count++;
   count = 'good'; //ERROR '"good"' 형식은 'number' 형식에 할당할 수 없습니다.

   // 문자열
   const message: string = 'hello world';

   //불리언
   const done: boolean = true;

   //문자 배열
   const strArr: string[] = ['hello', 'good'];

   //숫자 배열
   const numArr: number[] = [1,2];

   strArr.push(1); // 문자 배열에 숫자 넣는다고 에러

   // 두 가지 자료형 사용가능 string, undefined
   let stringOrUndefined: string | undefined = undefined; 
   
   // red, blue, purple중 하나만 할당가능
   let color: 'red' | 'blue' | 'purple' = 'red';
   color = 'purple';
   color = 'green'; // 에러
```

---
## 함수에서 타입 정의

```ts

   //매개변수 안의 인자들의 타입을 지정하고 ): number 리턴되는 값의 타입 지정.
   function add(x: number, y: number): number {
      // return null; //에러 number만 리턴가능
      return x + y;
   }

   //es6 화살표 함수 버전
   const add = (x: number, y: number): number => x + y;

   //숫자 배열의 총합을 구하는 arrSum 라는 함수
   const arr:number[] = [1,2,3,4,5];
   const arrSum = (x: number[]): number => x.reduce((val: number, initVal: number) => initVal + val);
   
   //리턴하는 역할의 함수가 아닐때
   const voidReturn = (): void => {
      console.log('good')
   }

   //리턴하는 자료형이 아무거나
   const anyTypeReturn = (): any => {
      console.log('good')
   }


```