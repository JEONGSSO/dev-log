const solution = (a, b, c) =>
  a < b + c && b < a + c && c < a + b ? "YES" : "NO";

console.log(solution(6, 7, 11));
console.log(solution(13, 33, 17));
console.log(solution(15, 15, 29));

// 매 2 변의 길이의 합계는 세번째 측면의 길이를 초과한다.

const sol2 = (a) => Math.ceil(a / 12);

console.log(sol2(25));
console.log(sol2(61));
console.log(sol2(178));
