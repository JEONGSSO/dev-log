## wsl(windows subSystem for linux) 설치
[ms 공식 문서](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10)나 다른분들이 블로그해놓은 글을따라 하면 된다. 

https://www.lesstif.com/software-architect/wsl-2-windows-subsystem-for-linux-2-89555812.html

https://www.omgubuntu.co.uk/how-to-install-wsl2-on-windows-10 영문

---
## E: Unable to locate package nodejs 에러
      sudo apt-get update
---


## zsh 설치

설정을 잘못했는지 기본 bash에선 code . 명령어가 먹히지 않는다

zsh 에서는 code . 명령어를 기본으로 잡아주는 듯 하고
다양한 테마 및 자동완성을 지원한다.

https://velog.io/@moseoridev/WSL-2%EC%97%90-Zsh-%ED%95%9C-%EB%B0%A9%EC%97%90-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

https://velog.io/@praconfi/zsh-oh-my-zsh

---

## 실행시의 기본 경로 설정하기

https://docs.microsoft.com/ko-kr/windows/terminal/troubleshooting

맨 처음 터미널을 키면 /mnt/c/Users/\<userName>으로 접근이 되는데 단일 경로 트리구조이기 때문에 c 드라이브 구조 까지 접근하는데에 리소스를 잡아먹는다고 한다.

기본 경로를 /home으로 변경하자

터미널에서 ctrl + , 로 세팅에 들어가서

```json

profiles 

   list : [
      {
         ...

         "name": "Ubuntu",
         "startingDirectory" : "//wsl$/Ubuntu/home"
         // "startingDirectory" : "//wsl$/Ubuntu-18.04/home" 버전이 있는 경로일수도 있다. 

         ...
      }
   ]
   ...

```

다시 새탭을 열어보면 /home 폴더로 시작한다.

---

## WSL2+Ubuntu 20.04+Docker개발 환경 구축 (일본어)

https://qiita.com/amenoyoya/items/ca9210593395dbfc8531

---
## 가상환경 vmmem 메모리 이슈

https://itun.tistory.com/612

---
## wsl 명령어(powerShell)

실행중인 wsl 리스트와 버전
wsl -l -v

실행중인 wsl 프로세스 종료
wsl --shutdown 

---

## nvm(node version manager) 설치
https://docs.microsoft.com/ko-kr/windows/nodejs/setup-on-wsl2 ms공홈

기존 apt get 설치로 node를 설치하게 되면 10.x 버전으로 설치되기 때문에
(21-01-02 기준 lts 14.x 버전)

nvm으로 최신버전의 node와 npm, npx를 설치하고자 함

[curl(명령줄을 사용하여 인터넷에서 콘텐츠를 다운로드하는 데 사용되는 도구)](https://github.com/nvm-sh/nvm) 설치 최신버전 확인도 이 깃허브에서 한다.
   
      sudo apt get curl

      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

      <!-- 20-01-02 기준 curl 최신버전 v0.37.2 -->

      nvm ls

      <!-- 설치된 node 리스트 나열 -->

      nvm install --lts

      <!-- lts버전(안정적 릴리즈 버전) 다운 -->


그런데 wsl 새탭을 열때 nvm 못찾는 경우가 있다.

nvm 설치시에 .bashrc 파일에 추가해주는 경로를

zsh 세팅 파일(.zshrc)에
      
      vi ~/.zshrc

      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
      [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

추가후 

      source ~/.zshrc

세팅파일 적용

zsh를안쓰면 .profile 이나 .bashrc 파일에 추가한다.

---

## Intellij IDEA with WSL2

Jetbrains IDEA 사용할 수도 있으니 기록.

윈도우와 wsl gui로 연결해주는 프로그램 설치

https://sourceforge.net/projects/vcxsrv/
x server 다운

https://velog.io/@melonicecream/Intelij-IDEA-with-WSL2

.bashrc(.zshrc) 에 해당 display 추가

      export DISPLAY="`grep nameserver /etc/resolv.conf | sed 's/nameserver //'`:0"

      source .bashrc 

https://www.jetbrains.com/ko-kr/phpstorm/download/#section=linux

tar.gz 파일 다운후 tar 명령어로 압축 해제

      tar -zxf

-z gunzip을 사용

-x 묶음을 해제

-f 파일 이름을 지정

      #의존성 설치
      sudo apt (또는 apt-get) install libxss1 

압축 푼 폴더에가서 ./bin/phpstorm(idea-name).sh로 실행

상용구(alias)생성
vi .bashrc
```bash
      alias pst="sh /home/PhpStorm-203.6682.180/bin/phpstorm.sh"
```

**Unable to detect graphics environment 에러 나는경우**

윈도우에서 x server가 실행이 안되어있어 /etc/resolve.conf 파일이 없기때문 에러 나는것
xlaunch.exe 실행

https://realforce111.tistory.com/40
---
## jetbrain 한글 입력 

fcitx라는 프로그램을 설치후 설정해주어야 한다.

https://hasoo.github.io/java/wsl2-intellij/

---

