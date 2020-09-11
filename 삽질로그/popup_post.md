form에서 post를 보낼때 새창으로 열려면 _blank를 사용하면 된다

근데 _blank는 크기를 지정할 수 없다

크기를 지정하려면 편법(?)을 써야하는데

Vue의 ref를 사용하였다.
```html
   <form method="post"
      action="url"
      target="pop_up"
      ref="form"
   >
   </form>

```

```js
//Vue methods

// pop_up 이라는 가로,세로 10의 새창을 여는데
const pop_up = window.open("about:blank", "pop_up", "width=10,height=10");

// Vue의 ref 기능 사용으로 Element 접근 후
// pop_up의 주소를 해당 액션으로 변경시킴
pop_up.location = this.$refs.form.action

// form의 target은 pop_up이기 때문에 바로 폼을 submit 시키면 끝
this.$refs.form.submit();
```