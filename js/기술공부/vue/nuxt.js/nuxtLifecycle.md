Nuxt는
Next 같은 SSR 프레임워크 라이프 사이클 정리 문서
(Nuxt 2.12 Apr) 이후 버전

https://nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12/ 

NuxtServerInit -> Route middleware -> **validate** -> **asyncData()** -> beforeCreate() -> created() -> **fetch()** -> mounted() 

https://ko.nuxtjs.org/api/

**validate** 동적 route 컴포넌트 안에서 유효성 검증

```js
export default {
        validate({ params, query, store }) {
           return true // params가 유효할 경우.
           return false // 반대인 경우, Nuxt.js는 route 랜더를 멈추고 에러 페이지를 노출시킬 것입니다.
        }
    }
```

---

**asyncData** 서버사이드에서 데이터를 가져와 렌더링 가능케 함

```js
    export default {
      data() {
        return { project: 'default' }
      },
      asyncData(context) {
        return { project: 'nuxt' } // static Data
      },
    }
```

```js
    export default {
        // nuxtjs/axios 사용
        // data에서 선언한 동명의 값은 합쳐진다.
        data() {
            return {
                posts: [] // asyncData에서 posts값이 합쳐짐
            }       
        }

        // Promise
        asyncData( _this, { $axios }) { // _this는 params의 id값을 받거나 정의해놓은것들. 사용가능
          return $axios.$get(`https://api.nuxtjs.dev/posts`)
              .then(res => { return { posts: res }})
        }
    
        // async / await
        async asyncData({ $axios }) {
            const posts = await $axios.$get('https://api.nuxtjs.dev/posts')
            return { posts }
        }
        // 요렇게 하면 서버단에서 데이터가 fetch된 채로 렌더링되어 매우 빠르다고 느껴짐
        // 클라이언트에서 할 일을 서버에서 하니 서버의 부하가 늘어난다고 한다

    }
```     
---

**fetch()** 

```vue

<template>
    <div>
      <p v-if="$fetchState.pending">Loading....</p> <!-- $fetchState 사용 -->
      <p v-else-if="$fetchState.error">Error while fetching mountains</p>
      <ul v-else>
        <li v-for="(mountain, index) in mountains" :key="index.id">
          {{ mountain.title }}
        </li>
      </ul>
    </div>
</template>


<sciprt>
    export default {
        data() {
          return {
              mountains: [],
          }
        },
        async fetch() {
            this.mountains = await fetch(
                'https://api.nuxtjs.dev/mountains'
            ).then(res => res.json())
        },

        // axios 사용
        async fetch() {
            this.mountains = await this.$axios.$get('https://api.nuxtjs.dev/mountains')
        },
    }
</sciprt>
```     
---

**fetch()와 asyncData()의 차이점?**

https://lavalite.org/blog/asyncdata-vs-fetch#:~:text=AsyncData%20is%20a%20method%20that,t%20set%20the%20component%20data.
https://nuxtjs.org/blog/understanding-how-fetch-works-in-nuxt-2-12/

**asyncData**
    - 구성 요소 데이터를 설정하기 전에 서버렌더링이 로드되기 전에 매번 호출
    - vuex 스토어에 접근하여 값 설정 할 수 있다.
    - pages 컴포넌트에서만 사용가능
    - context 사용 불가(인자로 받음)
    - 초기 로딩은 서버에서 실행 -> 이후는 클라이언트에서 실행
    - data() 처럼 return 하여 사용  ex) return { mountains: ~~~ }
    
**Fetch**
    - 렌더링하기 전에 스토어를 채우는데 사용, 컴포넌트의 data를 세팅하지 않는 점을 빼면 asyncData와 비슷.
    - vuex 스토어에 접근은 가능하지만 값 설정은 불가능
    - 모든 Vue 구성 요소에서 사용가능
    - context 사용 가능 (함수내에 this로 사용)
    - $fetchState 객체 사용가능 pending, error 등의 상태 저장
    - this로 접근하여 변경함 ex) this.mountains = await ...
