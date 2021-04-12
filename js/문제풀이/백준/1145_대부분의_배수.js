// 30 42 70 35 90
// 210

// 적어도 3개로 나누어지는 가장 작은 자연수 찾기

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const solution = (arr) => {
    let min = Math.min(...arr);

    while (true) {
      let cnt = 0;
      for (let i = 0; i < arr.length; i++) {
        if (min % arr[i] === 0) {
          cnt++;
        }
      }
      if (cnt > 2) {
        return min;
      }
      min++;
    }
  };
  console.log(solution(line.split(" ")));
  rl.close();
}).on("close", function () {
  process.exit();
});
