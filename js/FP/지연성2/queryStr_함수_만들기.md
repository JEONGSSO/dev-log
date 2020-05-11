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
  fp.reduce((a, b) => `${a}&${b}`), // join 역할
  log
);

queryStr(obj);

// limit=10&offset=10&type=notice
```

Array.prototype.join 보다 다형성 높은 join 함수 만들기

```js

const join = curry((sep = ',', iter) => reduce((a, b) => `${a}${sep}${b}`, iter))

const queryStr = fp.pipe(
  Object.entries,
  fp.map(([k, v]) => `${k}=${v}`),
  join('&'),
  log
);

// limit=10&offset=10&type=notice

// 다형성
function *a() {
  yield 10;
  yield 11;
  yield 12;
  yield 13;
}

a().join() // 안 됨

join(', ', a()) // 10, 11, 12, 13

// join도 iter 프로토콜을 따르고 있기 때문에

const queryStr = fp.pipe(
  Object.entries,
  fp.lMap(([k, v]) => `${k}=${v}`),
  join('&'),
  log
);

// 지연된 계산도 가능하다.

// 이렇게 Array에서만 사용할 수 있는 join 함수를
// 이터러블 프로토콜을 사용하는 함수는 사용 가능하게 구현을 하였다.


```