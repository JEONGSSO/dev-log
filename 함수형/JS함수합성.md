## 함수 합성이란?

- 두 개의 함수를 하나의 함수로 결합하는 것.

```js
const c2 = (f1, f2) => (x) => f1(f2(x));

// 마크다운에서 이미지와 링크만 허용하는 함수
const imagify = (str) =>
  str.replace(/!\[([^\]"<]*)\]\(([^)<"]*)\)/g, '<img src="$2" alt="$1" />');
const linkify = (str) =>
  str.replace(
    /\[([^\]"<]*)\]\(([^)<"]*)\)/g,
    '<a href="$2" rel="noopener nowfollow">$1</a>'
  );

// 이미지와 링크를 모두 변환하는 함수를 만들때 c2를 사용!

// 커링을 사용하여 재사용성을 늘리는 방법
const linkifyAndImagify = c2(linkify, imagify);
// 직접 사용하는 방법
const linkifyAndImagify = (str) => linkify(imagify(str));

// 밑줄을 강조하기 위한 함수를 추가!
const emphasize = (str) => str.replace(/_([^_]*)_/g, "<em>$1</em>");

const processComment = c2(linkify, c2(imagify, emphasize));
```

### Compose

```js
// 일반 reduce를 사용하면 반대로 함수들을 합성하여 사용할 수 있다.
const compose =
  (...fns) =>
  (x0) =>
    fns.reduceRight((x, f) => f(x), x0);
// compose의 작동방식을 설명하기 위해 함수를 하나 추가
// 줄 시작에서 3개의 해시를(###) 넣으면 h3가 추가되도록

const headalize = (str) => str.replace(/^###\s+([^\n<"]*)/gm, "<h3>$1</h3>");

// 해당 기능을 compose로 이렇게 사용가능
// fxts, lodash, pipe랑 비슷하지만 pipe는 좀더 유연하게 사용할 수 있도록 만들어졌다
const processComment = compose(linkify, imagify, emphasize, headalize);
// headalize ... linkify까지 역순으로 실행됨

// 그리고 imagify전에 linkfy를 실행하면 이미지가 링크로 바뀌어 순서를 맞춰줘야 함.
```

### FLOW

compose와 반대로 동작하게 하려면 앞서 말씀드렸던 reduce를 사용.

```js
const flow =
  (...fns) =>
  (x0) =>
    fns.reduce((x, f) => f(x), x0);

// 다른 예제로 백틱 사이에 코드 포맷팅을 추가
const codify = (str) => str.replace(/`([^`<"]*)`/g, "<code>$1</code>");

const processComment = flow(headalize, emphasize, imagify, linkify, codify);

// headalize ... codify까지 왼쪽에서 오른쪽으로 함수들을 실행함.

// flow가 compose보다 보기가 좋고 깔끔함 함수를 한 번만 사용해야 할때 즉시실행함수로 넣어주는 방법도 있지만...
```

### PIPE

```js
const pipe = (x0, ...fns) => fns.reduce((x, f) => f(x), x0);

const map = (f) => (arr) => (arr) => arr.map(f);
const filter = (p) => (arr) => arr.filter(p);
const take = (n) => (arr) => arr.slice(0, n);
const join = (s) => (arr) => arr.join(s);

const itemize = (str) => `<li>${str}</li>`;
const orderedListify = (str) => `<ol>${str}</ol>`;
const chaoticListify = (str) => `<ul>${str}</ul>`;
const mentionsNazi = (str) => /\bnazi\b/i.test(str);

const comments = pipe(
  commentStrs,
  filter(mentionsNazi),
  take(10),
  map(emphasize),
  map(itemize),
  join("\n")
);
```

```js
// pipe의 장점이??
const withoutNazis = commentStrs.filter(noNazi);
const topTen = withoutNazis.slice(0, 10);
const itemizedComments = topTen.map(itemize);
const emphasizedComments = itemizedComments.map(emphasize);
const joinedList = emphasizedComments.join("\n");
const comments = chaoticListify(joinedList);
```

이렇게 변수 할당을 통해 작성할 수 있고 읽기도 수월하다
하지만 이렇게 작성된 경우 6개의 세미콜론이 있다.

이렇게 변수 할당을 통해 작성된 경우 총 6개의 선언(statement)

pipe로 작성된 경우 전체를 표현(expression)으로 합성

### **표현을 통한 코딩은 함수형 프로그래밍의 핵심**

함수 합성의 중요성은 코드를 어떻게 변경하는지가 아니라

어떻게 우리의 생각을 바꾸는지에 있다.

합성은 코드를 표현식간의 관계로 생각하도록 권장

단일 책임을 가지는 매우 작고 재사용가능한 함수를 사용하여 코딩하도록 권장

구현 세부사항보다 결과에 대해 집중할 수 있도록 도와준다.

```js
const map = (f) =>
  function* (iterable) {
    for (let x of iterable) yield f(x);
  };
const filter = (p) =>
  function* (iterable) {
    for (let x of iterable) {
      if (p(x)) yield x;
    }
  };
const take = (n) =>
  function* (iterable) {
    let i = 0;
    for (let x of iterable) {
      if (i >= n) return;
      yield x;
      i++;
    }
  };
const join = (s) => (iterable) => [...iterable].join(s);
```

제너레이터를 사용해 만든 동일한 동작을 하는 코드

## 참조

https://junghan92.medium.com/%EB%B2%88%EC%97%AD-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%95%A8%EC%88%98-%ED%95%A9%EC%84%B1-%EB%AD%90%EA%B0%80-%EA%B7%B8%EB%A0%87%EA%B2%8C-%EB%8C%80%EB%8B%A8%ED%95%A0%EA%B9%8C-5a2664b7c2b8
