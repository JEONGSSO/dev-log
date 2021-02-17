사파리에서 모달창을 열었을때 스크롤을 방지하기 위한

overflow hidden이 적용이 안된다.

제이쿼리로는 이렇게 적용하고

https://stackoverflow.com/questions/3656592/how-to-programmatically-disable-page-scrolling-with-jquery

```js
$(".contents").on("scroll touchmove mousewheel", function (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
});
```

비활성화

```js
$(".contents").off("scroll touchmove mousewheel");
```

css로 position fixed로 처리하는 방법

UI에 문제가 있을 수도 있다는 이야기가 있다.

나는 적용하면서 겪어보지 못했다.

```js
if (is_mobile) {
  $("#wrap").css({ position: "fixed" });
}
```

```js
if ($(".contents").css("position") === "fixed") {
  $(".contents").css({ position: "static" });
}
```
