```js
function countUp(number) {
  var start = 0;
  var countEl = document.querySelector('#tt');
  const randomCount = (max, min) => Math.floor(Math.random() * (max - min) + min);
  const countUp = (count) => {
    countEl.innerHTML = count > number ? number : count;
    const tt = setTimeout(() => {
      start += randomCount(10,17);
      countUp(start);
    },30)
    if (start > number) {
      clearTimeout(tt);
    }
  }
  countUp(++start);
}
```

개선 점

목표 숫자에 가까워질수록 느려져야하는 것
