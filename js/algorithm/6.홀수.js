const isOdd = (a) => a % 2 !== 0;
const sum = (a, b) => a + b;

const solution = (arr) => {
  const evenArr = arr.filter(isOdd);
  const total = evenArr.reduce(sum, 0);
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return { total, min };
};

const arr = [1, 2, 3, 4, 5];
console.log(solution(arr));
