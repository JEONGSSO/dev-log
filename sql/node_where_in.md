
```js
   const reaplceWhereIn = GET_GAME_LIST.replace('whereQuery', `${status === "all" ? "'in', 'out'" : `'${status}'`}`)

   // node에서 where in 구문을 사용할때 이렇게 사용하면 IN ('in', 'out') 이렇게 들어가 정상동작한다.
```