챕터 4

신기능들

spread 문법, rest 문법

해체 문법
구조분해 할당 문법

타입스크립트는 자바스크립트까지 컴파일한다

챕터 5

class 만들기

```ts

class Good {
  aaa = string[] = [];


  addAaa(aaa: string) {
    this.aaa.push(aaa)
  }


}

const good = Good();

good.addAaa('kim')
good.addAaa('lee')

// aaa를 private로 바꾸면 이렇게 할당하는 것을 컴파일 에러가 출력됨
good.aaa[2] = 'park'


class Product {
  private a: boolean;

  constructor(public name: string, public fee: number) {
    // public에 있는 애들은 a랑 같은 스코프에 위치함
    this.a = true
  }
}

```

상속

추상 클래스와 인터페이스의 차이

- 인터페이스는 구현을 하지않는다.
- 추상클래스는 부분부분을 오버라이드하여 사용할 수 있고, 구체적으로 구현부를 작성해야 함.

- 인터페이스의 접근 제한자 사용불가 (private, public) 대신 readonly는 사용 가능.
- 인터페이스는 클래스나 객체가 명시된 타입을 가질 수 있도록 강제한다.

### 제네릭

- 제네릭이란?

  - 함수 인자처럼 타입을 받아 유연하게 사용할 수 있게 하는것

- 제네릭 만들기

```ts
// T는 Type을 줄여부름
const test = <T, U>(objA: T, objB: U) => {
  return object.assign(objA, objB);
};

function test<T, U>(objA: T, objB: U) {
  return object.assign(objA, objB);
}
```

- 여기서 T와 U의 타입을 제한할 수 있는데

```ts
// object를 상속 받으면 터입을 제약 할 수 있다.
// union도 사용가능하고 다른 타입이나 인터페이스도 사용가능하다.
const test = <T extends object, U extends object>(objA: T, objB: U) => {
  return object.assign(objA, objB);
};
```

- 또 다른 기능?

```ts
interface Lengthy {
  length: number;
}

const countAndDescribe = <T extends Lengthy>(elem: T) => {
  let text = "음슴";

  // length에서 타입 에러가 나는데 T에서 length가 있는지 확신할 수 없기 때문
  // 그래서 Lengthy를 상속받아 에러를 없앰
  if (elem.length === 1) {
    text = "1개 있음";
  }

  return;
};
```

- keyof로 제네릭 적용하기

```ts
const test = <T extends object, U extends keyof T>(obj: T, key: U) => {
  return `value is ${obj[key]}`;
};

console.log(test({}, "name"));
// 여기서 빈객체를 넣으면 key가 아무것도 없으므로 무엇을 넣어도 에러남

console.log(test({ name: "kim" }, "name"));
```

- 제네릭 클래스

```ts
// 근데 이렇게 쓰면 내부에선 교집합인 메소드만 사용할 수 있음. valueOf등등
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (~this.data.indexOf(item)) return; // this.data.indexOf(item) === -1
    this.data.splice(this.data.indexOf(item), 1); // -1을 제거하니까 맨 뒤 인덱스가 삭제됨
  }

  getItems() {
    return [...this.data]; // 배열 복사본 리턴
  }
}

/*
  const objStorage = new DataStorage<object>();
  const kimObj = {name:'kim'} // 같은 객체 같은 주소를 넣어주어야 의도한대로 동작함
  objStorage.addItem({name: 'kim'}) // objStorage.addItem(kimObj)
  objStorage.addItem({name: 'good'})
  objStorage.removeItem({name: 'kim'}) // objStorage.removeItem(kimObj)
*/

// 의도치 않은 object타입이 들어왔을때를 대비하여 제네릭 타입을 제한하는것도 좋은 방법
// class DataStorage<T extends string | number | boolean>
```

```ts
// 100 유틸리티
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

const createCourseGoal = ({
  title,
  description,
  completeUntil,
}: CourseGoal) => {
  const courseGoal: Partial<CourseGoal> = {}; // 파티션을 사용하면 optional value로 바뀐다.
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;

  return courseGoal;
  // return courseGoal as CourseGoal; // 파티션이 아닌 필수값으로 만들기 위해 CourseGoal사용하여 타입 정의
};

const courseValues: CourseGoal = {
  title: "good",
  description: "설명",
  completeUntil: new Date(),
};

console.log(createCourseGoal(courseValues).title);

const namess: Readonly<string[]> = ["kim", "lee"]; // readonly 제네릭으로 문자열 배열 선언
// namess.push('asd'); // error
// namess[3] = 'park'; // error
// namess.pop(); // error
```

// 102 제네릭 vs 유니온
// 여러가지 다른 유형(다른 타입의 데이터를 리턴하는)과 함께 작동하는 형식이 있는경우 제네릭은 매우 탁월한 선택이다.

```ts
// 쌩 유니온으로 작업하면 일일이 쳐주어야 하고 번거롭다
// 제네릭에서 유니온을 설정하여 유연하게 처리.

class DataStorage {
  private data: (string[] | number[] | boolean)[] = [];

  addItem(item: string | number | boolean) {
    this.data.push(item);
  }

  removeItem(item: string | number | boolean) {
    const itemIndex = ~this.data.indexOf(item);

    if (itemIndex) return; // this.data.indexOf(item) === -1

    this.data.splice(itemIndex, 1); // -1을 제거하니까 맨 뒤 인덱스가 삭제됨
  }

  getItems() {
    return [...this.data]; // 배열 복사본 리턴
  }
}

// 추가 문제

//
// const data = extractData<string>(user, 'userId');
// 제네릭에 타입에따라 다른 데이터를 반환 할 수 있어 좋은 사용방법
```
