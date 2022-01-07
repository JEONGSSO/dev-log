const solution = (arr) => {
  const remain = arr.reduce((acc, val) => acc + val) - 100;

  // 시간복잡도 O(N^2)
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === remain) {
        arr.splice(j, 1); // 뒤에껄 항상 먼저 제거해라
        arr.splice(i, 1);
        return arr;
      }
    }
  }
};

// 합이 100이어야 함
// 다 더하고 두 수를뺀값이 100인경우에 그 두 수를 빼면 됨.

const arr = [20, 7, 23, 19, 10, 15, 25, 8, 13];

console.log(solution(arr));
