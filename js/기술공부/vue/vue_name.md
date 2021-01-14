vue componenet namd 쓰기

```html
<template>
   ...
</template>
```

```js
// item.vue
<script>
   export default {
      // name: 'item', 꼭 쓰기
      props: 'aaa',
      data() {
         return {
            item: {...}
         }
      }   
   }
</script>
```

```js
// item2.vue
<script>
   export default {
      // name: 'item2', 꼭 쓰기
      props: 'aaa',
      data() {
         return {
            item: {...}
         }
      }   
   }
</script>   
```

이렇게 name 객체를 선언하지 않고 빌드, 번들링 하게되면
번들링된 js파일에 item객체는 (당연히) var로 선언이 되기때문에 item 변수가
겹치게 되어 문제가 될 수 있다.

[이렇게 하면 지금 있거나 앞으로 작성할 HTML 엘리먼트와 충돌하는 것을 피할 수 있습니다.](https://kr.vuejs.org/v2/guide/components-registration.html#%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%9D%B4%EB%A6%84)