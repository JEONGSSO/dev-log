// const arr = [5, 2, 1, 3];
const arr = [2, 1, 3];
// const arr = [];

// 배열 중에서 누락된 값을 찾는 문제
// 위 arr에는 4가 누락되어있다 4리턴
// 빈 배열, 값이 하나뿐인 배열 예외처리

// 분할정복법

// 1. 배열을 정렬한다.
// 2. 반복문으로 값이 없는곳의 인덱스를 찾는다
// 3. 인덱스를 리턴한다.

// 50% 짜리 문제풀이
/**
 *
 * @param {number[]} A
 */
const solution = (A) => {
  const result = A.sort().findIndex((v, idx) => v !== idx + 1);
  return result === -1 ? A.length + 1 : result + 1;
};

// 다른분들은 배열의 길이만큼 더한 값에서 현재 배열 값을 뺀 방식을 사용하시더라
// (ex 1+2+3+4+5 = 15, 1+2+3+5 = 11
// 15 - 11 === 4

/**
 *
 * @param {number[]} A
 */
const solution1 = (A) => {
  if (!A.length) return 1;
  const currentSum = A.reduce((a, b) => a + b);
  const requireSum = ((A.length + 1) * (A.length + 2)) / 2; // 이걸 몰랐다
  return requireSum - currentSum;
};

console.log(solution1(arr));

// https://doubles-won.tistory.com/59
// https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/PermMissingElem.md
