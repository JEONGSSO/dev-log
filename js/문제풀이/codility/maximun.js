// 부분합을 구하는데, 합이 마이너스가 되면 포함하지 않고 다음 인덱스로 넘어간다.
// 각 값마다 더하고 만약에 음수가 나오면 음수 이전 값만 사용하고 음수가 나온 인덱스는 제외 후 반복
// 값이 하나일때는 그 값을 리턴
// 값이 음수만 있을때는 음수중 가장 큰 숫자 리턴

const arr = [3, 2, -6, 4, 0];
// const arr = [-1, -1, -2, -3, -4, -5, -6];
// const arr = [1, -2];
// const arr = [1];

// 50% 코드
// function solution(A) {
// if (!A.length) return 0;
// let result = A[0];
// let acc = 0;
// A.reduce((a, value) => {
//   acc = a + value;
//   if (acc > result) {
//     result = acc;
//   }
//   return a + value;
// });
// return result;
// }
// console.log(solution(arr));

function solution(A) {
  let max = A[0];
  let slice = A[0];
  for (let i = 1; i < A.length; i++) {
    slice = Math.max(A[i], slice + A[i]);
    max = Math.max(max, slice);
  }
  return max;
}
console.log(solution(arr));

// https://github.com/kimcoder/codility-javascript/blob/master/9.Maximum%20slice%20problem/9.MaxSliceSum.js
