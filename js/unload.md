# 웹 페이지를 벗어날때 checkOut 기능을 구현

제이쿼리 사용

## 크롬 브라우저 (socket.io)

```js
   $(window).unload(function () {
      socket.emit()
   }

   // 크롬에서는 unload시 ajax사용을 막았다.
   $(window).unload(function () {
      $.ajax({
         type: 'POST',
         url : 'url',
         data: {
            data:data
         },
         async: false
      });
   }

```

## IE, 파폭 브라우저 (ajax)

```js
   $(window).unload(function () {
      $.ajax({
         type: 'POST',
         url : 'url',
         data: {
            data:data
         },
         async: false
      });
   }

   // 파폭과 ie에서는 unload시에 emit이 동작하지 않았다.
   $(window).unload(function () {
      socket.emit()
   }

```

## 크롬, 파폭

```js
window.addEventListener("unload", function logData() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/log", false); // third parameter of `false` means synchronous
  xhr.send(analyticsData);
});

window.addEventListener("unload", function logData() {
  navigator.sendBeacon("/log", analyticsData);
});

// IE에서 동작하지 않았기에 고려하지 않았다.
// IE를 고려하지 않으면 sendBeacon을 권장한다고 한다.
```

https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
