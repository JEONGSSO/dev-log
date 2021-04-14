const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const num = Number(line);
  // 소수는 주어진 값 절반만 반복문 돌면 된다.
  const twoDivideCeilNumber = Math.floor(num / 2);

  let cnt = 0;
  for (let i = 1; i <= twoDivideCeilNumber; i++) {
    if (num % i === 0) {
      cnt++;

      if (cnt > 1) {
        console.log("False");
        rl.close();
      }
    }
  }
  console.log("True");
  rl.close();
}).on("close", function () {
  process.exit();
});
