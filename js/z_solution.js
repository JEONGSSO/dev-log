const solution = (x) => {
  const good = x.split("").reduce((acc, val) => {
    return acc + Number(val);
  }, 0);

  const second = good % 10;
  const first = (good - second) / 10;

  return first + second;
};

// const target = "12/31/2014";
const target = "5";

console.time(1);

const good = solution(target);
console.log(good);

console.timeEnd(1);
