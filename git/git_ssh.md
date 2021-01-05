# github ssh public key authorize

1. 깃허브에 로그인을 한 후에
2. [깃허브 Keys 링크](https://github.com/settings/keys "(SSH and GPG keys)") 접속
3. New SSH key 버튼 클릭
4. 키 타이틀과 공개키를 붙여넣는다.

## 공개키 생성하는 법 (window cmd 또는 bash에서)
```bash
### bash ###
$ ssh-keygen -t rsa
   엔터 3번 (인증 비번 설정 안함 + 유저 홈 디렉토리 밑 .ssh에 키 생성)
$ cd ~/.ssh
$ ls
   id_rsa id_rsa.pub
```

## linux

~/.ssh 폴더에 id_rsa, id_rsa.pub 파일이 있으면 사용

```bash
ssh-keygen -t rsa -b 4096 -C "example@naver.com"
# -t 암호화 타입 정하기
# -b  생성 키의 비트 수 지정(4096) rsa타입은 최소 768비트가 필요
# -C 주석 이메일로 주석 닮

# ssh-keygen을 실행하면 암호를 정할 수 있고 (생략가능)

~/.ssh 폴더에서 ll
id_rsa, id_rsa.pub 생성됨

cat id_rsa.pub

# cat 출력된 내용 복사 후 깃허브가서 붙여넣기

# ssh-agent 개인 키 관리를 해주는 기능 매번 passphrase 입력하지 않게 해줌

ssh-add ~/.ssh/id_rsa

#암호 입력했으면 끝. 암호가 없으면 입력안해도 되는듯

```

https://jootc.com/p/201905122827

https://dgkim5360.tistory.com/entry/gnu-linux-crypto-04-agents




.pub가 붙은 건 공개키, 안붙은 건 비밀키


5. github 프로젝트 페이지에 가서 clone or download 버튼 클릭, Use SSH 클릭, 링크 복사

6. git local project folder에서 $ git remote set-url origin 복사한_링크

7. git push

8. The authenticity of host 'github.com (IP)' can't be established. RSA key fingerprint is SHA256:(Key) Are you sure you want to continue connecting (yes/no)?

9. yes로 연결해주면 끝.

### 출처(https://m.blog.naver.com/PostView.nhn?blogId=hancury&logNo=220778148466&proxyReferer=https%3A%2F%2Fwww.google.com%2F)