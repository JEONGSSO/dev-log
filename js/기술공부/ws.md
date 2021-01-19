웹소켓 연결

```js
   const ws = new WebSocket("ws://localhost:8080");

   ws.onmessage = function (e) { //소켓에서 온 메세지를 받는 부분
      console.log(e.data)
   }

   ws.onerror(e) { // error 이름의 이벤트 발생시
      console.log(e)
   }

   ws.send('SUB target.value') // onopen 전에 보내면 당연히 동작하지 않음

   ws.onopen = function () { // js onload같은 역할, 데이터를 주고받을 준비가 된 후 호출
      ws.send('SUB target.value') // onopen 메소드 콜백함수로 진행

   }
```

https://developer.mozilla.org/ko/docs/Web/API/WebSocket