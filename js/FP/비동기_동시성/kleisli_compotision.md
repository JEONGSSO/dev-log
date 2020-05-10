```js
const f = (val) => val + 1;
const g = (val) => val * val;
console.log(g(f(1))); // 4
console.log(g(f())); // NaN
```

안전하게 합성되지 않은 함수

배열을 이용하여 안전하게 합성할 수 있다.

```js
[1]
  .map(f)
  .map(g)
  .forEach((val) => console.log(val)); // 1
[]
  .map(f)
  .map(g)
  .forEach((val) => console.log(val)); // 출력 없음
```

함수를 안전하게 합성하기 위해 Monad가 도입되었다.

promise와 같이 사용하여 안전하게 사용가능하다

```js
Promise.resolve(1)
  .then(f)
  .then(g)
  .then((result) => console.log(result));

// promise setTimeout
new Promise((res, rej) => {
  setTimeout(() => {
    res(1);
  }, 2000);
})
  .then(f)
  .then(g)
  .then((result) => console.log(result));
```

```js
const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
];

const f = (id) => find((user) => user.id === id, users);
const g = ({ name }) => name; // (g*f)(x) 합성 함수
const gf = (id) => g(f(id));

const result1 = gf(2);
users.pop();
users.pop();
const result2 = gf(2);

console.log(result1 === result1); // 출력 : true
console.log(result1 === result2); // 출력 : error
```

```js
function find(id, iter) {
  for (const a of iter) {
    if (a === id) return a;
  }
}

const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
];

const f = (id) => find(id, users) || Promise.reject('not found');
const g = ({ name }) => name; // (g*f)(x) 합성 함수
const gf = (id) =>
  Promise.resolve(id)
    .then(f)
    .then(g)
    .catch((err) => err);

gf(2).then((result) => console.log(result)); // bb

users.pop();
users.pop();.

gf(2).then((result) => console.log(result)); //  not found

// 함수 f에서 falsy한 값이 나오면 Promise.reject가 catch 로 던져 not found가 출력이 된다.
```
