# mysql 필드를 구분자로 묶어 출력.

## CONCAT 정해준 구분자를 기준으로 필드를 묶어주는 함수이다. 

```sql
SELECT CONCAT(`필드1`,'구분자',`필드2`,'구분자',`필드3`) FROM 테이블명;
```

```sql
SELECT GROUP_CONCAT( 필드명 SEPARATOR "구분자")
FROM 테이블명 
GROUP BY 그룹할 필드명;
```

예를들어 select 구분자 문에 ", "을 적어 문을 날려보면 
데이터가 두개 이상일때

test0, test1 요렇게 그룹화되어 검색된다.
구분자를 "-" 넣으면 test0-test1

출처: https://ra2kstar.tistory.com/56 [초보개발자 이야기.]