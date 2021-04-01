// const solution = (x) => {
//   const good = x.split("").reduce((acc, val) => {
//     return acc + Number(val);
//   }, 0);

//   const second = good % 10;
//   const first = (good - second) / 10;

//   return first + second;
// };

// // const target = "12/31/2014";
// const target = "5";

// console.time(1);

// const good = solution(target);
// console.log(good);

// console.timeEnd(1);

// function removeProperty(obj, prop) {
//   if (obj[prop]) {
//     delete obj[prop];
//     return true;
//   }
//   return false;
// }

// const obj = {
//   good: 1,
//   b: {
//     good: 222,
//   },
// };
// console.log(removeProperty(obj, "good"));
// console.log(obj);

// function formatDate(userDate) {
//   const dateArray = userDate.split("/");
//   const oneDigit = (date) => (date.length === 1 ? "0" + date : date);
//   const result = `${dateArray[2]}${oneDigit(dateArray[0])}${oneDigit(
//     dateArray[1]
//   )}`;
//   return result;
// }

// console.log(formatDate("12/31/2014"));

// function createCheckDigit(membershipId) {
//   let add = [...membershipId].reduce((acc, num) => acc + Number(num), 0);
//   while (add.toString().length > 1) {
//     add = createCheckDigit(add.toString());
//   }
//   return add;
// }

// console.log(createCheckDigit("55555"));
