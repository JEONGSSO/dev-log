# 기본적인 사용법

```js
import socket from 'socket.io'

socket.on('connection', {
   //연결이 된 후에

   socket.on('message') 받음
   socket.emit('message') 보냄
   socket.broadcast.emit('message') 나를 제외한 전체에 보냄

})

네임스페이스 room으로 잡는다고 가정

//
room.to(roodID).emit('message', {msg: 'hi'})
해당 room안의 roomID가 같은곳에만 메세지 가 보내진다.
```
