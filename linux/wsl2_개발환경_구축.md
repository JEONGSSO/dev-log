# wsl(windows subSystem for linux) 설치
[ms 공식 문서](https://docs.microsoft.com/ko-kr/windows/wsl/install-win10)나 다른분들이 블로그해놓은 글을따라 하면 된다. 

https://www.lesstif.com/software-architect/wsl-2-windows-subsystem-for-linux-2-89555812.html

---

## zsh 설치
https://velog.io/@moseoridev/WSL-2%EC%97%90-Zsh-%ED%95%9C-%EB%B0%A9%EC%97%90-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

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

# 가상환경 vmmem 메모리 이슈
https://itun.tistory.com/612