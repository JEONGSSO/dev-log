스크롤

```js
let currentScrollY = 5;
const headerEl = document.querySelector("#header");
const headerHeight = headerEl.offsetHeight; // 가변 높이가 아닐때

const HeaderViewhandler = () => {
  if (pageYOffset > currentScrollY && pageYOffset > headerHeight) {
    currentScrollY = pageYOffset;
    headerEl.classList.add("scroll_up");
  }

  if (pageYOffset < currentScrollY) {
    currentScrollY = pageYOffset;
    headerEl.classList.remove("scroll_up");
  }
};

addEventListener("scroll", _.throttle(HeaderViewhandler, 222)); // 로대시 쓰로들은 따로 구현 해야함.
```

intersectionObserver 사용하는 방법

https://jbee.io/web/optimize-scroll-event/
