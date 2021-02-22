/**
 *
 * @param {number[]} A
 * @return {number}
 */

//  처음에 문제를 잘못읽어서 중복되는 값중에 가장 큰 값을 내는 문제인줄 알았다.
const arr = [2, 1, 1, 2, 3, 1];

const solution = (A) => {
  const obj = {};
  A.forEach((num) => {
    if (obj[num]) obj[num] += 1;
    else obj[num] = 1;
  });
  return obj !== {} ? Math.max(...Object.values(obj)) : 0;
};

// 다시 찾아보니
// 중복되지 않은 숫자의 합을 리턴하는 전혀 다른문제;
const solution2 = (A) => {
  const obj = new Set();
  A.forEach((num) => {
    if (!obj[num]) obj.add(num);
  });
  return obj.size;
};

console.log(solution2(arr));
