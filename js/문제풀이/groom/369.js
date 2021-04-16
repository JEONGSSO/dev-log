// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const inputNum = Number(line);
  const numbers = [3, 6, 9];
  let count = 0;

  const check = (num) => {
    return numbers.some((number) => number === num % 10);
  };

  for (let i = 1; i < inputNum; i++) {
    for (let j = i; j > 0; ) {
      if (check(j)) {
        count++;
      }
      j = Math.floor(j / 10);
    }
  }

  console.log(count);
  rl.close();
}).on("close", function () {
  process.exit();
});

// https://jun01.tistory.com/14 참고 하였습니다.
