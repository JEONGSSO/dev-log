웹소켓 연결

```js
var socket = (function () {
  let ws;

  const messageHandler = (e) => {
    console.log(e.data);
  };
  const closeHandler = (e) => {
    console.log(e.data);
  };
  const sendHandler = (e) => {
    console.log(e.data);
  };
  const openHandler = (e) => {
    ws.send("SUB target.value"); // onopen 메소드 콜백함수로 진행
    console.log(e.data);
  };

  ws.onopen = openHandler; // js onload같은 역할, 데이터를 주고받을 준비가 된 후 호출
  ws.onmessage = messageHandler;
  ws.send("SUB target.value"); // onopen 전에 보내면 당연히 동작하지 않음
  ws.onerror = closeHandler;

  return {
    getSocket(wsUrl, protocol) {
      return ws;
    },
    socketInit(wsUrl, protocol) {
      ws = new Websocket(wsUrl, protocol);
    },
  };
})();
```

https://developer.mozilla.org/ko/docs/Web/API/WebSocket
