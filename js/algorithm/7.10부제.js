const solution = (day, arr) => arr.filter((v) => day === v % 10).length;

// array 메소드를 전부 순회할때는 사용해도됨

const carBackNums = [25, 23, 11, 47, 53, 17, 33];
const carBackNums2 = [25, 23, 11, 47, 53, 17, 10];
console.log(solution(3, carBackNums));
console.log(solution(0, carBackNums2));
