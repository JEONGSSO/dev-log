1. flex gap
   grid에서 사용하던 gap을 사용할 수 있다!

```css
display:flex
gap: 20px;
```

2. @support

```css
@supports (display: grid) {
  div {
    display: grid;
  }
}

@supports not (display: grid) {
  div {
    display: flex;
  }
}
```

3. css scroll snap

스크롤 가까운 엘리먼트에 붙는거 css로만 처리 가능!

```html
<h3>Scroll down &darr;</h3>
<div id="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  <div></div>
</div>
```

```css
#container {
  width: 500px;
  height: 500px;
  overflow: auto;
  /* ADD THIS TO THE PARENT */
  scroll-snap-type: y mandatory;
}

.item {
  /* ADD THIS TO THE CHILD */
  scroll-snap-align: center;
```

4. is pesudo selector

```css
.box button,
.container button,
.dialog button {
  color: red;
}

:is(.box, .container, .dialog) button {
  color: red;
}
```

5. aspect-ratio

정해진 비율을 유지할 때 유용하다.

```css
img {
  aspect-ratio: 16/ 9;
}
```

---

## 참조

노마드 코더

https://blog.logrocket.com/the-latest-features-of-css-in-2021/
