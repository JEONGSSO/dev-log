## apt? apt-get?
Advanced Packaging Tool의 약자

apt는 apt-get + apt-cache를 필요한 기능만 사용한 버전이라고 생각하면된다.
사용방법은 같다. ex) apt install package-name

https://devlog.jwgo.kr/2019/04/11/apt-vs-apt-get/

      apt-get update
      
apt 패키지의 정보를 업데이트 한다.


      apt-get install package-name

패키지 설치

      apt-get upgrade

설치된 패키지 버전을 최신버전으로 업글

      apt-get remove package-name

패키지 제거

      apt-get --purge remove package-name

설정파일까지 제거

http://jinyongjeong.github.io/2016/06/07/Ubuntu_apt_get_commend/
