# NVL과 COALESCE

## NVL 
어떤 컬럼이 null일 때 특정 값으로 치환
SELECT NVL(SCORE,0) AS SCORE FROM SCORE_TABLE; --SCORE이 NULL 일 때 0을 반환해준다.

## COALESCE 
- 모든 값이 null이면 null 반환.
- a1 ~ aN 까지 비교, null이 아닌 것 반환

pay.amount 
```sql
SELECT  COALESCE(a,b,c,0) AS TEST FROM TEST_TABLE;
```

a가 null이면 b반환, b가 null이면 c 반환, 모두 null이면 0 반환.

출처: https://hyunit.tistory.com/42 [공부노트]
