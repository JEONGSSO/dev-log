const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  const arr = [];
  for (const v of iter) {
    arr.push(f(v));
  }
  return arr;
});

const filter = curry((f, iter) => {
  const arr = [];
  for (const v of iter) {
    if (f(v)) arr.push(v);
  }
  return arr;
});

// const reduce = (f, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   }

//   for (const v of iter) {
//     console.log('ttttttttttttt', iter);
//     acc = f(acc, v);
//   }
//   return acc;
// };

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

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (fn, ...fns) => (...as) => go(fn(...as), ...fns);

const range = (num) => {
  let i = -1;
  const arr = [];
  while (++i < num) {
    arr.push(i);
  }
  return arr;
};

const lRange = function* (num) {
  let i = -1;
  while (++i < num) {
    yield i;
  }
};

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

const lMap = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

const lFilter = curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
});

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
