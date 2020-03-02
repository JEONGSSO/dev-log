페이스북 fp js

1. 입력받은 수가 짝수라면 2로 나눈다.
2. 입력받은 수가 홀수라면 3을 곱하고 1을 더한다.
3. 결과로 나온 수에 같은 작업을 1을 리턴할때까지 반복한다

같은 문제를 풀려다 막혀서 댓글에 유인동님의 솔루션

```js
function* filter(f, iter) {
  for (const a of iter) if (f(a)) yield a;
}

function* take(limit, iter) {
  for (const a of iter) if (limit--) yield a;
}

const head = iter => take(1, iter).next().value;

const find = (f, iter) => head(filter(f, iter));

function* map(f, iter) {
  for (const a of iter) yield f(a);
}

const zipWithCount = (iter, cnt = 1) => map(a => [a, cnt++], iter);

function* infinity(f, acc) {
  while (true) yield (acc = f(acc));
}

const isOdd = a => a % 2;

const calc = a => isOdd(a) ? a * 3 + 1 : a / 2;

const iter = zipWithCount(infinity(calc, 1));
console.log(iter.next().value); // [4, 1]
console.log(iter.next().value); // [2, 2]
console.log(iter.next().value); // [1, 3]
console.log(iter.next().value); // [4, 4]
console.log(iter.next().value); // [2, 5]

const [num, count] =
  find(([a]) => a == 1,
    zipWithCount(
      infinity(calc, 1)));

console.log(num, count); // 1, 3
```

그리고 팁을 주신 부분은

리스트 프로세싱 혹은 이터러블 프로그래밍 = 리스트를 기반으로 사고하는 프로그래밍 이고,
[4, 2, 1, 4, 1, 2] 로 반복되는 수열이 있다고 생각하면 풀기 쉬워지는 문제가 된다고 하셨다.
그 다음에는 [[4, 2], [1, 4], [1, 2]] 처럼 <b>리스트</b>가 있으면 풀기 쉬워진다고 하심.

"
   1의 계산하는 함수는 calc로

   2에서의 멈추는 함수는 find 와 보조함수로

   2에서의 반복하는 부분은 infinity로

   실행된 카운트를 계산하는 zipWithCount 도 추가로 나뉘었습니다.

   아래서부터 읽어보면
   1부터 계산을 반복하면서
   카운트를 새고
   계산된 값이 처음 1이 나올 때를 찾고 멈춘다.
"

천천히 읽어보면서 눈으로 따라가봐야겠다. 