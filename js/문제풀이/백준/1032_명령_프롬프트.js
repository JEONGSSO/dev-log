const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputCnt = 0;
let count = 0;
const nameArr = [];

rl.on("line", function (line) {
  inputCnt++;

  if (inputCnt === 1) {
    count = Number(line);
  } else {
    nameArr.push(line);
  }

  if (inputCnt > count) {
    const solution = (n, arr) => {
      if (n === 1) {
        return arr[0];
      }

      const strLength = arr[0].length;
      let result = "";

      for (let j = 0; j < strLength; j++) {
        for (let i = 1; i < n; i++) {
          if (arr[0][j] !== arr[i][j]) {
            result += "?";
            break;
          }

          if (i === n - 1) {
            result += arr[0][j];
          }
        }
      }

      return result;
    };

    console.log(solution(count, nameArr));
    rl.close();
  }
}).on("close", function () {
  process.exit();
});
