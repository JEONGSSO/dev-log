ubuntu 20.04 버전에서는 8버전만 사용이 가능하다.

## mysql 8버전 설치 및 root 계정 만들기

```bash
sudo apt-get update

sudo apt-get install mysql-server

sudo service mysql start

# 사용자 보기
SELECT user,authentication_string,plugin,host FROM mysql.user;

# 유저 만들기
UPDATE mysql.user SET authentication_string = PASSWORD('password') WHERE User = 'root';

#실행
FLUSH PRIVILEGES;

# root 계정 비밀번호 적용
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

FLUSH PRIVILEGES;

#비밀번호 입력
mysql -u root -p
```

---

참조

https://2pound2pound.tistory.com/240
