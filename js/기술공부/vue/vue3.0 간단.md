# vue 2 -> vue 3 변경점 간략히 

##### 08.04 기준 베타 버전이기 때문에 바뀔 수 있음
##### IE 11부터 지원

## 9월 19일 3 버전 릴리즈 됨.
https://github.com/vuejs/vue-next/releases/tag/v3.0.0

캡틴 판교님 vue3 훑어보기
https://joshua1988.github.io/web-development/vuejs/vue3-coming/

----

### [간략 변경점 설명 (한글)](https://velog.io/@bluestragglr/Vue3-%EB%AC%B4%EC%97%87%EC%9D%B4-%EB%B0%94%EB%80%8C%EB%82%98%EC%9A%94)
### [Vue 3.0 릴리즈 ppt](https://docs.google.com/presentation/d/1yhPGyhQrJcpJI2ZFvBme3pGKaGNiLi709c37svivv0o/edit#slide=id.p)

---
### [내부 코드 리팩토링](https://docs.google.com/presentation/d/1yhPGyhQrJcpJI2ZFvBme3pGKaGNiLi709c37svivv0o/edit#slide=id.g46b2d60f5b_0_0)
자체 실시간 성능 테스트에서 같은 로직에 대해 두 배의 속도 향상을 보였다고 밝힘.

---
### 최초 앱 설정이 바뀜

기존 new Vue로 설정했던 것과 달리 createApp메소드를 이용해 사용하는 모듈들을 체이닝하는 방식으로 변경 됨.
```js
new Vue ({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


// Vue 3.0

import { createApp } from 'Vue';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');

```
---
### [React Portals 기능 공식 포함](https://vueschool.io/articles/vuejs-tutorials/portal-a-new-feature-in-vue-3/?utm_source=Vue.js+Developers&utm_campaign=21dbbbc30c-VJD_NEWSLETTER_146&utm_medium=email&utm_term=0_ae2f1465e2-21dbbbc30c-197471933)

React Portals란
부모 컴포넌트 바깥에서 렌더링 할 수 있는 기능

---
### reactive(반응형) get/set -> [proxy](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)방식으로 변환

---

### [쓸 데 없는 root element X -> fragment 지원](https://v3.vuejs.org/guide/single-file-component.html#introduction)

```vue
   <template>
      <div >  <!-- 불필요한 depth -->
         ...
      </div>
   </template>

   <template>
      ...
   </template>
```

---
### [더 나은 TS 지원](https://v3.vuejs.org/guide/typescript-support.html#official-declaration-in-npm-packages)

```vue
<script lang="ts">

import { defineComponent } from 'vue' // 해당 함수로 타입체크 컴포넌트를 만들 수 있다.

interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      } as Book
    }
  }
})

</script>
```

---
### [React hooks에서 영감을 받은 composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api)
 
밑 코드 참조 https://velog.io/@bluestragglr/Vue3-%EB%AC%B4%EC%97%87%EC%9D%B4-%EB%B0%94%EB%80%8C%EB%82%98%EC%9A%94 
```vue
    // Vue2.x
        export default {
          props: {
            title: String
          },
          data () {
            return {
              username: '',
              password: ''
            }
          },
          methods: {
            login () {
              this.$emit('login', { // 이벤트 버스 사용
                  username: this.username,
                  password: this.password
                })
            }
          },
            computed: {
            lowerCaseUsername () {
              return this.username.toLowerCase()
            },
            mounted () {
                console.log('title: ' + this.title)
            }
        }

    // Vue 3.x
    
    import { reactive, computed, onMounted  } from 'vue';

    export default {
      props: {
        title: String
      },
      setup (props, { emit }) {     //기존 data와 methods, mounted등등의 메소드들을 셋업 함수에 넣을 수 있따.
        const state = reactive({    //state에 reactive 메소드로 감싼 객체를 넘겨 리턴해 담는다.
          username: '',
          password: '',
          lowerCaseUsername: computed(() => state.username.toLowerCase())   // computed 사용!
        })

        onMounted(() => {   // mounted 사용
          console.log('title: ' + props.title)
        })
    
        const login = () => { 
          emit('login', {   //이벤트 버스 사용 (emit을 setup의 인자로 받을 수 있다.)
              username: state.username,
              password: state.password
            })
        }

        const changeName = (name) => {
            state.username = name   // 무려 this를 사용하지 않아도 된다!!
        }

        return { 
          login,
          state,
          changeName
        }
      }
    }
```


