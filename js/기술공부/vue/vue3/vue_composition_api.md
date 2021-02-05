## composition API 정리

```js

// 기존 반응성을 위해 선언했던 data 함수
...
data() {
   return {
      title: 'good'
   }
}
...
```

## vue3에서는 ref와 reactive 함수를 사용해 만든다. 

ref와 reactive의 차이점은?

ref는 원본값을 value라는 속성에 담아두고 변경을 감시하는 객체 **원시값 사용가능(객체도 가능)**

reactive는 원본 객체 자체에 변경을 감지하는 옵저버를 추가해 그대로 반환한 값. **객체만 사용가능**

```js

// vue3에서는 ref와 reactive 함수를 사용해 만든다. useState같은 느낌?
import { ref, toRefs, reactive, computed } from 'vue';

// setup전에 사용하는 방법
const useState= () => {

   // case 1
   const title = ref('good');
   const test = computed(() => title.toLocaleLowerCase()) // computed 사용

   return {
      title,
      test
   }

   // case 2 
   const state = reactive({
      title: 'good'
      test: computed(() => state.title.toLocaleLowerCase()) // computed 사용
   })

   return {
      // state case2 reactive로 생성한 객체는 반응성을 가지지 않음 그래서 toRefs사용
      toRefs(state)
   }
}

export default {
   setup() {
      const { title, test } = useState();

      ...

      return {
         title,
         test
      }
   }
}

~~~~~
~~~~~

import { reactive, computed } from 'vue';
export default {
   setup() {

      // case1
      const state = ref({
         title: 'good'
         test: computed(() => state.title.toLocaleLowerCase()) // computed 사용
      })

      // case2
      const state = reactive({
         title: 'good'
         test: computed(() => state.title.toLocaleLowerCase()) // computed 사용
      })

      return {
         title,
         test
      }
   }
}
```

방법이 여러가지인데 무슨 차이가 있는지는 더 찾아봐야 할 것 같다.

https://v3.vuejs-korea.org/ko-KR/guide/composition-api-introduction.html
https://www.danvega.dev/blog/2020/02/12/vue3-ref-vs-reactive/
https://geundung.dev/102