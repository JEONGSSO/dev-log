```js
function solution(N) {
  let count = 0;
  const binaryArr = N.toString(2).split("");
  const oneIndexArr = [];

  binaryArr.forEach((value, idx) => {
    value === "1" && oneIndexArr.push(idx);
  });

  oneIndexArr.forEach((value, idx) => {
    const countValue = oneIndexArr[idx + 1] - value;
    if (!isNaN(countValue) && count < countValue) {
      count = countValue;
    }
  });

  return count === 0 ? 0 : count - 1;
}
```

처음에 감이 안와서 힌트를 받고나서 푼 첫번째 예제
너무 무식하게 푸는 것 같다.

https://im-developer.tistory.com/178
다른분의 깔끔한 문제풀이
