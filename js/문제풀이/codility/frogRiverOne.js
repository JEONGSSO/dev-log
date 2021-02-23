// 숫자 N개가 담긴 배열A 와 정수 X가 주어지는데
// 1초마다 A[N] 위치에 나뭇잎이 떨어진다
// 즉 X가 5라면 1,2,3,4,5가 전부 나오는 이른시간을 찾는 문제
// 0의 위치에서 X까지 가고자하는 가장 이른 시간을 구해 리턴, 도달하지 못하면 -1 리턴

//  분할 정복법
//  X가 값이 배열에 속해있는지 확인
//  X 보다 낮은 값들이 존재하는지 확인

// const arr = [1, 3, 1, 4, 2, 3, 5, 4]; // 이전에 1234가 존재하고 5가 나오는 인덱스는 6번이므로 6을 반환하면 된다.
// const X = 5;

// const arr = [1, 2, 3, 4, 3, 2, 1, 2];
// const X = 4;

const arr = [1];
const X = 1;

/**
 *
 * @param {number[]} A
 * @param {number} X
 */
const solution = (A, X) => {
  const set = new Set();

  for (let idx = 0; idx < A.length; idx++) {
    if (A[idx] <= X) set.add(A[idx]);
    if (set.size === X) return idx;
  }

  return -1;

  // findIndex에서 문제는 값이 하나인 배열일때 ([1]) 리턴된 idx인 0을 가지고 있는 인덱스를 찾는다, 0 값은 없기때문에 -1이 리턴되어 실패
  //  1이 리턴되어야 정상적으로 0번을 찾음
  // const count = A.findIndex((num, idx) => {
  //   if (num <= X) set.add(num);
  //   if (set.size === X) return idx;
  // });

  // return count;
};

console.time(1);
console.log(solution(arr, X));
console.timeEnd(1);

// https://tram-devlog.tistory.com/entry/Codility-42-FrogRiverOne

// 27% 실패작
// function solution(X, A) {
//   const set = new Set();

//   const targetIndex = A.indexOf(X);
//   if (targetIndex === -1) return targetIndex;

//   for (let i = 0; i < targetIndex; i++) {
//       if (A[i] < X) {
//       set.add(A[i]);
//       }
//   }
//   return set.size + 1 === X ? targetIndex : -1;
// }
