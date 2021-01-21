
예제로 쓰일 2개의 테이블이 있다

## employee
|idx|namd|department_id
| ---- | --------------- | ----------------------- |
|1|김|10|
|2|나|20|
|3|박|30|
|4|이|40|
|5|신|NULL|

---
## department
|idx|namd|department_id
| ---- | --------------- | ----------------------- |
|1|경리부|10|
|2|인사부|20|
|3|영업부|30|
|4|전산부|40|


## (inner) join
조인하고자 하는 두개의 테이블에서 공통된 요소들을 통해 결합(교집합)하는 방식

```sql
SELECT e.name ename, d.name dname
FROM employee e
JOIN department d
ON e.department_id = d.department_id
```
|idx|ename|dname
| ---- | --------------- | ----------------------- |
|1|김|경리부|
|2|나|인사부|
|3|박|영업부|
|4|이|전산부|

(inner) join은 요렇게 출력된다.
그런데 employee 테이블에서 department_id 가 null인 신씨를 구하고 싶으면?

## outer (left, right) join

left와 outer를 정하는 기준은
from절에 적어준 테이블이 left가 되고, join절에 적어준 테이블이 right가 됩니다.


```sql
SELECT e.name ename, d.name dname
FROM employee e
LEFT OUTER JOIN department d
ON e.department_id = d.department_id
```

|idx|ename|dname
| ---- | --------------- | ----------------------- |
|1|김|경리부|
|2|나|인사부|
|3|박|영업부|
|4|이|전산부|
|5|신|NULL|

https://doorbw.tistory.com/223