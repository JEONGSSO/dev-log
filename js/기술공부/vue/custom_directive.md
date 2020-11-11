```js

Vue.directive('customFocus', {
    inserted: function (el) {
      el.focus()
    }
  })

```

```html

<input v-customFocus> <!-- 바로 포커스 잡힘 -->

```