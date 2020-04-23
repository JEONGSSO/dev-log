페이지 unload시에 db에서 해당 정보를 delete 해야 했었다.

그런데 페이지 새로고침시에도 unload를 타는데 

unload 후 db에서 해당정보를 삭제하는 시간보다 새로고침하는 시간이 빨라 새로고침이 되고나서야 해당 쿼리를 읽고 나서 삭제가 되는것이다.

그리고 나서 다시 새로고침하면 첫 번째 새로고침시에 삭제가 된 정보를 db에서 찾을 수 없는 정보라고 프론트단에서 안내를 해줄 수 있었는데

[pageshow](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event) 메소드
페이지가 보이게 되면 무조건 타는 메소드이다.


```js

window.onpageshow = function(event) {
   if ( event.persisted || (window.performance && window.performance.navigation.type == 1)) {
      alert('해당 정보가 없습니다.')
   }
};

```

[pagehide](https://developer.mozilla.org/en-US/docs/Web/API/Window/pagehide_event)도 있다.

---

## event.persisted
[BFCache](https://www.google.com/search?q=bfcache&oq=bfcache&aqs=chrome..69i57j69i64j0l5&sourceid=chrome&ie=UTF-8)라고 브라우저가 빠른 로딩을 위해 해당 페이지의 정보를
기억해놓았다가 꺼내는 방식인데 이 캐시를 사용하게되면 document.ready 타지 않는다.

즉 다시 페이지를 그리는게 아니라 이전꺼를 그대로 갔다 쓰기 때문에 최신화를 해줘야하는 곳이있다면 유용하게 사용할 수 있따.

아이폰 사파리에서 뒤로가기시에 아주 유용하게 사용할 수 있다.

브라우저가 bfcache를 사용하게되면 event.persisted는 true로 나타나게 된다
----

## window.performance.navigation.type
- 브라우저가 새로고침으로 페이지를 그렸는지 type 1
- 브라우저가 뒤로 가기로 페이지를 그렸는지 type 2

여러가지 타입이 있으니 보면 좋을 것 같다.

[네비게이션 타이밍 MDN](https://developer.mozilla.org/ko/docs/Navigation_timing)







