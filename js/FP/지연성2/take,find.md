```js
const find = (f, iter) => go(
  iter,
  filter(f),
  take(1),
  ([a]) => a
)
```

마찬가지로 find 함수 안 filter를 lFilter로 바꾸면

take(1)에서 하나를 찾을 때까지만 filter를 돌고 나온다.
