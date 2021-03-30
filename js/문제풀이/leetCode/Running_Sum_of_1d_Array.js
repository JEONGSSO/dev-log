// 최초로 풀었던 코드

const solution = (x) => {
  const result = [x[0]];
  for (let i = 1; i < x.length; i++) {
    result.push(x[i] + result[i - 1]);
  }
  return result;
};

// 다른 사람의 reduce 사용 예
const solution = (nums) => {
  let result = [];

  nums.reduce((acc, num) => {
    acc += num;
    result.push(acc);
    return acc;
  }, 0);

  return result;
};
