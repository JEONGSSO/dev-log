처음 푼 코드;

```js
const reverse = function (x) {
  const limit = 2147483648;
  let toString;
  let flag = false;
  if (x < 0) {
    flag = true;
    x = Math.abs(x);
  }
  toString = x.toString();
  const arr = [];
  for (let i = 0; i < toString.length; i++) {
    arr[toString.length - i - 1] = toString[i];
  }

  const tt = arr.map((v) => v / 1);
  if (flag) arr.unshift("-");
  const result = arr.join("") / 1;
  if (result > limit) {
    return 0;
  } else if (flag && result < -limit) {
    return 0;
  }
  return result;
};
```

다른 사람의 풀이를 보고 다시 풀어봤다.

```js
const reverse = (num) => {
  const limit = Math.pow(2, 31);
  const a = num < 0 ? -1 : 1;
  const number = Math.abs(num).toString().split("").reverse().join("");

  return limit < number ? 0 : number * a;
};
```

처음 짠 코드와 비교해서 실행시간이나 메모리 사용량에서 차이가 없었다.
그래도 이렇게 이쁘게 짜는게 너무 부럽다 많이 연습해야겠다.
