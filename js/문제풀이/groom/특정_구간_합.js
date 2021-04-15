// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
let array;
let targetIndices;

const toNumber = (arr) => arr.map((num) => Number(num));

rl.on("line", function (line) {
  if (count === 1) {
    array = toNumber(line.split(" "));
  } else if (count === 2) {
    targetIndices = toNumber(line.split(" "));
  }
  count++;

  if (count === 3) {
    const [index, targetIndex] = targetIndices;
    const arraySlice = array.slice(index - 1, targetIndex);
    const result = arraySlice.reduce((acc, value) => acc + value);

    console.log(result);

    rl.close();
  }
}).on("close", function () {
  process.exit();
});
