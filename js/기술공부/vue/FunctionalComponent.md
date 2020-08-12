Vue 에서도 React Hooks 전의 리액트처럼 functional Componenet를 사용할 수 있었다.

```vue

<template>
  <div>
    <Test
      msg="test"
      @click="clickTest"
    >

    </Test>
  </div>
</template>

<script>
  import Test from './test'

    export default {
        layout: 'default',
        components: {
            Test
        },
        methods: {
          clickTest(e) {
              e.target.style.backgroundColor = "red";
          }
        },
    }
</script>
```

```vue

<template functional> <!-- functional 선언 -->
  <div>
    {{props.msg}} <!-- 리액트처럼 그대로 사용 -->
    <button @click="listeners.click">sadasd</button> <!-- click Event는 listners.click에서 받을 수 있다. -->
  </div>
</template>

<script>
    export default {
        name: 'Test',
    }
</script>

```

Vue 3 문서에 breaking 될것이라고는 나와있는데 정확히 나와봐야 알 것 같다.

https://v3.vuejs.org/guide/migration/functional-components.html
