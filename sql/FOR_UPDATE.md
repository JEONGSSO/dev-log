```sql
SELECT * FROM table where idx = 1 FOR UPDATE
```

FOR UPDATE란 해당 작업이 끝날때까지 LOCK를 걸어놓는것이다.

예를 들어 영화 예매시에 자리가 1자리 있다고 하면
둘다 SELECT 되었을때 자리가 남았다고 뜨기때문에 무결성 에러가 날 수 있따.

먼저 온 예매자가 FOR UPDATE로 해당 컬럼을 LOCK을 걸어

작업이 끝나기전에 다른 사람이 SELECT를 하면 대기를 해야하는 것.
