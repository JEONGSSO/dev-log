문자비교, 숫자, 시간 날짜비교를 제공함

```js

// 언어에 맞는 날짜 및 시간 서식을 지원하는 객체의 생성자

// 한국시간 기준으로
console.log(Intl.DateTimeFormat())

console.log(Intl.NumberFormat('ko-kr').format(3500)) // 3,500
```

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl