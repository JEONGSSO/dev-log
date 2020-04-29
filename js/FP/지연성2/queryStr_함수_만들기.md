```js
const obj = { limit: 10, offset: 10, type: 'notice' };
const queryStr = (obj) => obj;

console.log(Object.entries(obj)); // entries key, value의 배열을 만들어줌

/*   
   0: (2) ["limit", 10]
   1: (2) ["offset", 10]
   2: (2) ["type", "notice"]
*/

const queryStr = (obj) =>
  fp.go(
    obj,
    Object.entries,
    fp.map(([k, v]) => `${k}=${v}`),
    fp.reduce((a, b) => `${a}&${b}`),
    log
  );

// queryStr은 obj를 받아 첫 번째 인자로 바로 넘기므로
// pipe문으로 축약할 수 있다.

const queryStr = fp.pipe(
  Object.entries,
  fp.map(([k, v]) => `${k}=${v}`),
  fp.reduce((a, b) => `${a}&${b}`),
  log
);

queryStr(obj);

// limit=10&offset=10&type=notice
```
