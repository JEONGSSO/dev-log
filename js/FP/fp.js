const L = {};
const log = console.log;

const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const reduce = curry((f, iter, acc) => {
  if (acc === undefined) {
    iter = iter[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const v of iter) {
    acc = f(acc, v);
  }
  return acc;
});

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

const takeAll = take(Infinity);

const go = (...args) => reduce((a, f) => f(a), args);
const go1 = (...args) =>
  reduce((a, f) => (a instanceof Promise ? a.then(f) : f(a)), args);

const pipe = (fn, ...fns) => (...as) => go(fn(...as), ...fns);

L.range = function* (num) {
  let i = -1;
  while (++i < num) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

const range = (start, stop, step = 1) => {
  const arr = [];
  let i = stop ? start : 0;
  stop = stop || start;
  while (i < stop) {
    arr.push(i);
    i += step;
  }
  return arr;
};

const join = curry((sep = ",", list) =>
  reduce((pre, val) => pre + sep + val, list)
);

// export default {
//   map,
//   filter,
//   reduce,
//   go,
//   pipe,
//   curry,
//   range,
//   lRange,
//   take,
//   lMap,
//   lFilter,
// };
