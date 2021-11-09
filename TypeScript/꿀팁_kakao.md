1. enum 보다는 union type 추천

enum을 사용하고 컴파일 해보면 객체가 생성됨, 런타임에 영향을 줌

```ts
enum Fruit {
  Apple,
  Banana,
  Orange,
}

// js transpiled 되어 객체가 생성됨
(function (Fruit) {
  Fruit[(Fruit["Apple"] = 0)] = "Apple";
  Fruit[(Fruit["Banana"] = 1)] = "Banana";
  Fruit[(Fruit["Orange"] = 2)] = "Orange";
})(Fruit || (Fruit = {}));

// 객체가 생성되지 않음
type Fruit = "apple" | "banana" | "orange";
```

enum을 사용하는 가장 많은 이유는 자동 완성

Fruit.을 입력하면 모든 속성들이 나열이 되어 개발하지 편하다

union을 사용하면 Fruit을 annotation해줘야함

```ts
const enum Fruit {
  Apple,
  Banana,
  Orange,
}
```

이렇게 const를 사용하여 enum을 사용 했을 경우에 객체가 생성되지 않는다.

2. index signature 보다는 mapped type을 추천

```ts
// index signature
const PRICE_MAP: { [fruit: string]: number } = {
  apple: 1000,
  banana: 1500,
  orange: 2000,
};

// mapped type
const PRICE_MAP: { [fruit in Fruit]: number } = {
  apple: 1000,
  banana: 1500,
  orange: 2000,
};
```

mapped type은 index 순서에 영향을 받지 않고 나중에 다른 과일이 추가되고, 가격을 누락했을경우 컴파일 에러가 나므로 실수를 방지 할 수 있다.

3. 외부 패키지의 타입 치환하기

패키지를 사용하면서 @types/모듈이름 설치하면 대부분 타입들이 잘 정의되어있지만
변경을 해야 할때가 있다, 파일을 하나 만들고 제네릭으로 타입을 받아
해당 모듈을 리턴하게 하여 매 번 annotation하는 반복작업을 지울 수 있다.

react-redux 의 useSelector를 예로

```ts
const toast = useSelector((state: MyState) => state.common.toast);

// useTypedSelector.ts
export default function useTypedSelector<R>(selector: (state: MyState) => R): R {
  return useSelector(selector);
}

interface DefaultMyState {
  common: { ... };
}
declare module "react-redux" {
  interface DefaultRootState extends DefaultMyState {} // 새로 확장하여 덮어 씌울 수 있다.
}

```

4. 타입 가드 활용하기

```ts
interface Person {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
}
function toString(value: Person | Product) {
  if ("age" in value) {
    return `${value.name} ${value.age}세`;
  } else {
    return `${value.name} ${value.price}원`;
  }
}
```

age key값이 value안에 있는지 판단하여 조건문을 처리

타입들이 많아진다면
리덕스 action type으로 switch문 분기하는 것처럼

타입에 타입 이름을 유니크하게 만들어 분기 처리할 수도있다.

```ts
interface Person {
  type: "Person";
  name: string;
  age: number;
}
interface Product {
  type: "Product";
  name: string;
  price: number;
}
interface Building {
  type: "Building";
  name: string;
  location: string;
}
function toString(value: Person | Product | Building) {
  switch (value.type) {
    case "Person":
      return `${value.name} ${value.age}`;
    case "Product":
      return `${value.name} ${value.price}`;
    case "Building":
      return `${value.name} ${value.location}`;
  }
}
```

## 참조

---

https://fe-developers.kakaoent.com/2021/211012-typescript-tip/
