```html

<div id="list" class="list swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide item" v-for="(item, index) in list" :key="index">
      <div class="c1">{{ item.data }} - {{ item.data }}</div>
      <div class="c2">{{ item.data }}</div>
      <div class="c3">
        <span class="c4">{{ item.data }}</span>
        <span class="c5">ggg</span>
        <span class="c6">{{ item.data }}</span>
      </div>
    </div>
  </div>
</div>

```

```js
export default {
    name: "swiper",
    methods: {
      initSwiperMatch: function() {
        this.swiper = new Swiper('#list', {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false, // 임의 조작하면 멈추겠냐
          }
        });
      },
    },
    mounted() {
      setTimeout(() => {
        this.initSwiperMatch();
        // ajax비동기 데이터로 v for를 사용하면 fetch 및 렌더링 시간때문에 비동기함수를 사용해 swiper 가 정상적으로 부착되도록 지연 시간을 준다.
      }, 1000)
    }
  }
```