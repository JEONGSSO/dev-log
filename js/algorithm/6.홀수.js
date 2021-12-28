const isOdd = (a) => a % 2 !== 0;
const sum = (a, b) => a + b;

const solution = (arr) => {
  const evenArr = arr.filter(isOdd);
  const total = evenArr.reduce(sum, 0);
  const min = Math.min(...evenArr);

  return { total, min };
};

const arr = [12, 77, 38, 41, 53, 92, 85];
console.log(solution(arr));
