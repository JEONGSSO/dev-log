# volta란

자바스크립트 도구 관리자

npm 처럼 install로 설치할 수 있는 관리자.

---

노드를 설치하는 방법은 무수히 많다.

가장 많이쓰이는 노드버전매니저는 nvm 이다.

nvm 대신 linkedin팀이 만든 volta를 사용해서

node와 pm2를 설치하려고 한다.


```bash
  # curl 설치되어 있어야 함
  curl https://get.volta.sh | bash
  
  # .zshrc 또는 .bashrc에 변수가 설정되어 있을것이다 안되어 있으면 기입후 source  
  export VOLTA_HOME="$HOME/.volta"
  export PATH="$VOLTA_HOME/bin:$PATH"

  #node 14 버전 lts 다운
  volta install node@14

  volta install pm2
  volta install python3 

```

---

https://volta.sh/

https://www.youtube.com/watch?v=B_jgH_ZyjIY