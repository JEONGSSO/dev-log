(() => {
  let count = 0;
  const init = 1;
  // let init = Number(require('fs').readFileSync('/dev/stdin').toString());

  const solution = (n) => {
    if (n / 1 === init && count) {
      return count;
    }

    const second = n % 10;
    const first = (n - second) / 10;
    const sum = first + second > 9 ? (first + second) % 10 : first + second;

    count++;
    return solution(second + sum.toString());
  };

  console.log(solution(init > 9 ? init : "0" + init));
})();
