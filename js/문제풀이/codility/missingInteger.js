const arr = [1, 3, 6, 4, 1, 2]; // return 5
const arr2 = [1, 3, 6, 4, 1, 2]; // return 5

// 같은 오름차순 sort 지만 속도차이가 약 25배정도 난다;
console.time(1);
arr.sort();
console.timeEnd(1);

console.time(2);
arr2.sort((a, b) => a - b);
console.timeEnd(2);

// 처음 풀었던 코드 33%
function solution(A) {
  const set = new Set();
  let sum = 0;
  A.forEach((v) => {
    if (!set[v]) set.add(v);
  });

  set.forEach((v) => {
    sum += v;
  });

  const requireSum = ((set.size + 1) * (set.size + 2)) / 2;
  return sum > 0 ? requireSum - sum : 1;
}

// console.log(solution(arr));

// 다른분의 코드

/**
 *
 * @param {number[]} A
 */
const solution2 = (A) => {
  A.sort((a, b) => a - b);
  let min = 1;

  A.forEach((v, i) => {
    if (A[i] === min) {
      min++;
    }
  });

  return min;
};

console.log(solution2(arr));

// https://sustainable-dev.tistory.com/7
