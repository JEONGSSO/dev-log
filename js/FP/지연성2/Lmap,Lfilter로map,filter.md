Lazy map을 이용해서

기존 map 리팩토링

```js
const map = curry((f, iter) => {
  const arr = [];
  for (const v of iter) {
    arr.push(f(v));
  }
  return arr;
});

const filter = curry((f, iter) => {
  const arr = [];
  for (const v of iter) {
    if (f(v)) arr.push(v);
  }
  return arr;
});

// L.map을 사용해서 리팩토링 해보자

const takeAll = take(Infinity);

const map = curry((f, iter) => go(iter, L.map(f), takeAll));

//  이렇게도 쓸 수 있다.

const map = curry((f, iter) =>
  go(
    L.map(f)(iter), // 요렇게 iter가 map의 마지막 인자로 들어가니, pipe로 코드를 줄일 수 있다.
    takeAll
  )
);

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));
```
