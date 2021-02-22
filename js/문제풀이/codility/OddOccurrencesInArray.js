// A[0] = 9  A[1] = 3  A[2] = 9
// A[3] = 3  A[4] = 9  A[5] = 7
// A[6] = 9

// 배열 홀수 값으로 짝이 지어져 있다, 짝이 지어져 있지 않은 값을 리턴하면 됨 (7 리턴).

const arr = [9, 3, 9, 3, 9, 7, 9];

// 처음 짠 코드;
// 값이 매우 커지면 망하는 성능에 정말 안좋은 코드다
// 시간 복잡도 O(N**2)
/**
 * @param {number[]} A
 * @return {number}
 */
function solution(A) {
  const array = [];
  A.forEach((v) => {
    const findIndex = A.indexOf(v);
    if (!array[findIndex]) array[findIndex] = 1;
    else array[findIndex] += 1;
  });

  return A[array.indexOf(1)] || 0;
}

// 다른 사람들의 코드를 참조했다.
// 외부 변수 obj에 중복되는 키를 삭제해서 중복되지 않는 키만 남기는 방법
// 시간복잡도 O(N**) or O(N*log(N))

/**
 * @param {number[]} A
 * @return {number}
 */
const solution = (A) => {
  const obj = {};
  A.forEach((v) => {
    if (obj[v]) delete obj[v];
    else obj[v] = 1;
  });
  return Object.keys(obj)[0];
};

console.log(solution(arr));

// https://danwritescode.com/odd-occurrences-in-an-array-codility-100-solution-in-javascript/
