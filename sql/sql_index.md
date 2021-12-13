## Single Indexes (싱글)

RDB에서 인덱스는 유니크하지 않은 애들을 찾을때 사용한다.

Binary search 반씩 조회하는것

log는 지수
(log_2(n))

필드의 유니크를 보장 할 수 있다.
단 인덱스를 저장할 공간이 또 따로 필요하다.

인덱스를 사용하기 좋은 경우

1. 읽기 작업이 많을때 (Create, Update, Delete 성능은 줄어듬)
2. 필드의 고유 값이 적을 떄?
3. 테이블의 크기가 작을 때 (어느정도 작은지는 알아서 판단)

## Composite Indexes (복합)

여러개의 필드를 조합하여 인덱스를 만듬

ex) class와 position을 조합하여 새로운 인덱스를 만듬

## class-position Primary Key

AssassinMid -> 10

ControllerSupport -> 16

- 결합 인덱스는 AND조건으로 검색되는 경우 성능에 아주 중요한 역할

- 두 개 이상의 조건이 OR로 조회되는 경우는 별로다.

(필드)이름을 concat해서 사용함
class-position일 때 where에서의 성능향상의 순서를 지켜야 함
ex) 여기서는 class 컬럼으로 최대한 걸러 준 후 position으로 검색하여 효율성을 높임!

---

## 참조

https://user3141592.medium.com/single-vs-composite-indexes-in-relational-databases-58d0eb045cbe

https://jhkang-tech.tistory.com/210
