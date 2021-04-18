// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const newLineValue = Number(line);
  const gugu = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = [];

  const calcNewLine = (val) => {
    if (newLineValue !== 1 && val === 1) {
      return false;
    } else if (newLineValue > val) {
      return newLineValue % val === 0;
    } else {
      return val % newLineValue === 0;
    }
  };

  gugu.forEach((first) => {
    gugu.forEach((second) => {
      if (first !== 1) {
        if (calcNewLine(result.length + 1)) {
          result.push(`${first} * ${second} = ${first * second}\n`);
        } else {
          result.push(`${first} * ${second} = ${first * second} `);
        }
      }
    });
  });

  console.log(result.join(""));

  rl.close();
}).on("close", function () {
  process.exit();
});
