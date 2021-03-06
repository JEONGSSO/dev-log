XMLHttpRequest 보다 강력한 기능을 가진 web API

```js
const fetchModule = async (url, options) => {
  const fetchData = await window
    .fetch(url, options) // promise 리턴
    .then((res) => res.json()) // json 형식으로 리턴
    .catch((error) => error);

  console.log(fetchData);
};
```

https://developer.mozilla.org/ko/docs/Web/API/Fetch_API
