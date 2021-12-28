const solution = (num) => {
  let sum = 0;
  for (let a = 0; a <= num; a++) {
    sum += a;
  }
  return sum;
};

console.log(solution(3));
