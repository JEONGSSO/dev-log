// 1 ~ 32길이의 2진수가 주어지는데 1이 몇개인지 찾는 문제

// 내가 처음 푼 문제풀이

var hammingWeight = function (n) {
  let count = 0;
  const isOne = (s) => s == 1;
  for (str of n.toString(2)) {
    isOne(str) && count++;
  }
  return count;
};

// 2진수 문제인데 비트연산자를 안썼다는거 자체가 부끄러웠다.

// 다른 사람 코드

var hammingWeight2 = function (n) {
  let count = 0;
  for (let i = 0; i < 32; i++) {
    if (n & 1) count++;
    n >>= 1;
  }
  return count;
};
