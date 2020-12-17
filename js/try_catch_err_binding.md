```js

async onSubmit() {
   try {
      const res = await axios('/test') 
      // 로오직
   } catch(e) {
      console.log(e) // 에러 스트링부분만 나옴
      console.log(e.response) // 에러 객체 사용가능
   }
}

```