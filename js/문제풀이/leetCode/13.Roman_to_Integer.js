// - III = 3
// - IV = 4
// - IX = 9
// - LVIII = 58
// - MCMXCIV = 1994

const alias = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

// const str = "III";
// const str = "IX";
// const str = "IV";
// const str = "LVIII";
const str = "MCMXCIV";

// 앞 문자가 뒤 문자보다 작으면 앞 문자 - 뒤 문자 후 합
// 같거나 크면 그냥 합

let sum = 0;
/**
 * @description O(Log N)
 * @param {string} str
 * @return {number}
 */
const solution = (str) => {
  for (let i = 0; i < str.length; i++) {
    const num = alias[str[i]];
    const nextNum = alias[str[i + 1]] || 0;
    sum += nextNum > num ? -num : num;
  }
  return sum;
};
console.time(1);
console.log(solution(str));
console.timeEnd(1);
