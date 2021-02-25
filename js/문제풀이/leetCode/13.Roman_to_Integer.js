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

// const str = "IX";
// const str = "III";
const str = "VVV";

// 앞 문자가 뒤 문자보다 작으면 뺄셈
// 같거나 크면 합

// 문자열을 배열로 만듬
// 문자열을 숫자로 치환
// 반복문을 통해 지금 값과 다음 값 비교
// 지금 값이 더 작으면 합계 + 다음 값 - 지금 값
// 아니면 합계 + 다음 값 + 지금 값
//

let sum = 0;
/**
 * @description O(Log N)
 * @param {string} str
 * @return {number}
 */
const solution = (str) => {
  [...str].forEach((s, index) => {
    if (!str[index + 1]) return;
    const num = alias[s];
    const nextNum = alias[str[index + 1]];
    // const nextNum = str[index + 1] ? alias[str[index + 1]] : 0;
    console.log("num", index, num);
    console.log("nextNum", index + 1, nextNum);
    // if (num < nextNum) {
    //   sum += nextNum - num;
    // } else {
    //   sum += num + nextNum;
    // }
  });
  // console.log(sum);
};
console.time(1);
solution(str);
console.timeEnd(1);
