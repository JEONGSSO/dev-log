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

```ts

```
