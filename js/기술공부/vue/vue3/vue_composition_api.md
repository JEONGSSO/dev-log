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

- ref

  - 값을 변경할 때 ref.value로 값을 변경
  - ref는 원본값을 value라는 속성에 담아두고 변경을 감시하는 객체 **원시값 사용가능(객체도 가능)**

- reactive
  - 바로 값 변경가능
  - 원시값에 반응형 X
  - 원본 객체 자체에 변경을 감지하는 옵저버를 추가해 그대로 반환한 값. **객체만 사용가능**

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

// setup (created, beforeCreate) 대체

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

## watch, watchEffect

```js

setUp () {
   ...

   const filters: Filters = reactive({
      keyword: '',
      sortType: '',
      page: 1
    });

   const stopWatch = watch(filters, (e, ee, eee) => {
      // filters가 변경 될때 마다 실행됨
      console.log('e', e); // {keyword: "", sortType: "", page: 1}
      console.log('ee', ee); // {keyword: "", sortType: "", page: 1}
      console.log('eee', eee); // cleanup 함수
   });

    watchEffect(() => {
      // useEffect 같은 역할 인듯 싶다
      console.log(filters);
    });

    const stopWatchHandler = () => {
      console.log('stopWatch');
      stopWatch(); // watch 실행 중지됨
    };

   ...
}

```

https://v3.vuejs-korea.org/ko-KR/guide/composition-api-introduction.html
https://www.danvega.dev/blog/2020/02/12/vue3-ref-vs-reactive/
https://geundung.dev/102
