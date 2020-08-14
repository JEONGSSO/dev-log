# github ssh public key authorize

1. 깃허브에 로그인을 한 후에
2. [깃허브 Keys 링크](https://github.com/settings/keys "(SSH and GPG keys)") 접속
3. New SSH key 버튼 클릭
4. 키 타이틀과 공개키를 붙여넣는다.

## 공개키 생성하는 법 (cmd 또는 bash에서)
```bash
### bash ###
$ ssh-keygen -t rsa
   엔터 3번 (인증 비번 설정 안함 + 유저 홈 디렉토리 밑 .ssh에 키 생성)
$ cd ~/.ssh
$ ls
   id_rsa id_rsa.pub
```
.pub가 붙은 건 공개키, 안붙은 건 비밀키

5. github 프로젝트 페이지에 가서 clone or download 버튼 클릭, Use SSH 클릭, 링크 복사

6. git local project folder에서 $ git remote set-url origin 복사한_링크

7. git push

8. The authenticity of host 'github.com (IP)' can't be established. RSA key fingerprint is SHA256:(Key) Are you sure you want to continue connecting (yes/no)?

9. yes로 연결해주면 끝.

### 출처(https://m.blog.naver.com/PostView.nhn?blogId=hancury&logNo=220778148466&proxyReferer=https%3A%2F%2Fwww.google.com%2F)