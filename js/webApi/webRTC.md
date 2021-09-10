# webRealTimeCommunication 이하 webRTC

웹소켓은 소켓 서버에다 연결 해서 메시지를 포워딩해주는 방식인데
수 많은 메시지들이 왔다갔다 할때 서버 부하가 걸릴 수 있기때문에 사용자 경험에 좋지않고
또, 서버가 내려가면 통신할 수 없는 문제도 있다

이를 보완하기 위해 RTC를 사용

브라우저끼리 연결이 필요할 때 peer to peer(p2p)[개인과 개인 통신] 방식으로 연결되어 있는 브라우저와 양방향 통신을 할 수 있는것.

## 연결

브라우저에서 서버에게 정보와 위치를 전송하여 상대 브라우저와 연결을 한다.
즉 서버를 사용하긴하는데 다른 사람의 위치, 정보만을 보냄

## 단점

- 확장성 제약
  - 1000명이 있는방에 RTC를 이용하여 영상을 올린다 하면, 999명에게 업로드를 해주어야 하는 점

## 참조

- 노마드코더 WebRTC