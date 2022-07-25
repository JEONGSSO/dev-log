localhost와 127.0.0.1의 차이는?

localhost는 유닉스 소켓으로의 연결이고 네트워크를 통하지 않는다.

127.0.0.1은 TCP/IP를 사용하여 자신의 컴퓨터 환경에 접근하는 방식
OS에서 기본적으로 부여해주는 자신의 IP 주소라고 생각하면 편하다.
127.0.0.1는 방화벽 등 완전히 localhost와 완전히 동일하게 동작하지 않는다.

## 참조

- mysql 8.0
- https://phoenixnap.com/kb/localhost-vs-127-0-0-1
