# AWS 용어들?

## AWS (Amazon Web Services)
아마존에서 개발한 클라우드 컴퓨팅 플랫폼으로 네트워킹 기반의 가상 컴퓨터와 스토리지 네트워크 인프라 등등의 서비스 제공

---
## EC2 (Elastic Compute Cloud)
- 한 대의 가상 컴퓨터를 임대한다는 개념, 사용한만큼 비용을 지불하면 된다.
- 인스턴스의 타입 t2(기본) => t3로 변경해 요금 절약이 가능하다.

---
## RDS(Amazon relational database service)

- RDB 서비스 제공
- EC2와 함께 사용하며 아마존에서 DB설정, 운영, 백업 기능을 가진 EC2와 분리된 DB전용서버

---
## S3(Simple Storage Service)

aws라는 클러우드 서비스를 하나의 컴퓨터라고 가정할 때

S3는 그 중에 저장장치이다.

기본적으로 3 copy를 지원
S3의 파일 관리 방법은 최소 3개의 물리적 가용영역에 자동으로 분산저장됨.

예를들어 서울AWS에 파일을 저장했다면 서울AWS1, 2, 3 ...에 저장된다는 것.

파일 서버로 활용할 수 있다.
트래픽 처리는 AWS가 알아서 해준다.

S3에 접근하기 위해서는 일반적인 file io api(?)는 사용 불가하고
REST/HTTP 기반의 프로토콜만 지원한다.

---
# Elastic Beanstalk

-  Docker 컴테이너를 기반으로 app을 쉽게 배포, 운영 관리를 도와주는 서비스
-  콘솔이나, cli를 통해 배포가 가능하다.
-  롤백이 간단하다.
-  app 버전을 다양한 환경에서 배포 가능하다. (prod, dev ...)

출처:: https://gskworld.tistory.com/7
https://bcho.tistory.com/693