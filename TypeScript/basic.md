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

---

## ts 파일 만들기(test.ts)

```ts
// test.ts
//확장자를 ts로 해준다음 사용할 수 있다.

const message: string = "hello world";
console.log(message);
```

message 값이 선언된 코드를 보면 :string이라고 명시해주었는데 이는 상수 message의 자료형이 string이라는것을 명시한것.

그 후 package.json에서 선언한 스크립트를 실행.
npm run build -> outDir에서 지정해준 폴더에 컴파일 된 파일이 생긴다.

```js
"use strict";
var message = "hello world";
console.log(message);
```

## 기본타입

```ts
//다른 자료형으로 재 할당시 에러.
let count = 1;
count++;
count = "good"; //ERROR '"good"' 형식은 'number' 형식에 할당할 수 없습니다.

// 문자열
const message: string = "hello world";

//불리언
const done: boolean = true;

//문자 배열
const strArr: string[] = ["hello", "good"];

//숫자 배열
const numArr: number[] = [1, 2];

strArr.push(1); // 문자 배열에 숫자 넣는다고 에러

// 두 가지 자료형 사용가능 string, undefined
let stringOrUndefined: string | undefined = undefined;

// red, blue, purple중 하나만 할당가능
let color: "red" | "blue" | "purple" = "red";
color = "purple";
color = "green"; // 에러
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

   리턴하는 역할의 함수가 아닐때
   const voidReturn = (): void => {
      console.log('good')
   }

   //리턴하는 자료형이 아무거나
   const anyTypeReturn = (): any => {
      console.log('good')
   }


```

---

## interface사용하기

```ts
interface Shape {
  getArea(): number;
}

class Circle implements Shape {
  constructor(radius: number) {
    this.radius = radius;
  }

  radius: number;

  getArea() {
    return this.radius * this.radius * Math.PI;
  }

}

const shapes: Shape[] = [new Circle(5)];

shapes.map(v => console.log(v.getArea())) // 5 * 5 * 3.14...  7.85...

constructor에 radius선언하고 밑에 radius를 다시 선언해야 했는데 여기서 접근자 키워드를 사용하면 (private, public)
constructor에서만 한번 선언하면 된다.

class Circle implements Shape {
  constructor(private radius: number) { //private로 circle 클래스 내에서만 참조할 수 있게 선언.
    this.radius = radius;
  }

  // radius: number; 요건 지워도 된다.

  getArea() {
    return this.radius * this.radius * Math.PI;
  }
}

const circle = new Circle(5);

console.log(circle.radius) // private 접근자로 에러발생.

```

### 제네릭

타입을 마치 함수의 파라미터처럼 사용하는 것을 의미

```ts
function getText<T>(text: T): T {
  return text;
}

// 함수의 인자 처럼 타입을 넘겨 동적으로 구성할 수 있다.
getText<string>("hi");
getText<number>(10);
getText<boolean>(true);

// 제네릭 인터페이스
interface GenericLogTextFn {
  <T>(text: T): T;
}

function logText<T>(text: T): T {
  return text;
}

// 밑에 두개는 같다
let str: <T>(text: T) => T = logText; // 그저 타입을 정의하고 logText함수를 할당 한 것 뿐이다.
let str2: GenericLogTextFn = tt;

console.log(str<string>("zzz")); // zzz

// 프로토타입 프로퍼티의 타입 알게하기
interface LengthWise {
  length: number;
}

function logText<T extends LengthWise>(text: T): T {
  // LengthWise 상속받아 length가 어떤 타입인지 알게 한다.
  console.log(text.length);
  return text;
}

// 확장 상속으로 T의 key를 추론할 수 있게 해줌
function getProperty<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];
}
let obj = { a: 1, b: 2, c: 3 };

console.log(getProperty(obj, "a"));
console.log(getProperty(obj, "z")); // error z는 obj의 key가 아님
```

### 이넘

- 숫자형 이넘

  ```ts
  enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
  }
  ```

  초기 값을 주면

  ```ts
  enum Direction {
    Up = 1,
    Down, // 2
    Left, // 3
    Right, // 4
  }
  ```

  1씩 증가되며 선언됨

  초기값을 주지않으면 0부터 1씩 늘어난다.

  ```ts
  // 실전 사용시
  enum Response {
    No = 0,
    Yes = 1,
  }

  function respond(recipient: string, message: Response): void {
    // ...
  }

  respond("Captain Pangyo", Response.Yes);
  ```

- 문자형 이넘
  ```ts
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }
  ```
  숫자형 이넘처럼 auto increment가 없다. 항상 명확한 값이 나옴.

---

참조
https://joshua1988.github.io/ts/intro.html

### maybe 제네릭

```ts
const Nothing = Symbol("nothing");
type Nothing = typeof Nothing;
type Maybe<T> = T | Nothing;
```
