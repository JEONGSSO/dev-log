레이어 메뉴를 열고 다른곳을 클릭시 그 레이어를 닫아야 한다면


```js
   $('#wrap').click(function(e){
      if( !$('#menu').has(e.target).length ) $('#menu').hide();
   });
```

jquery의 has 메소드로 클릭된 영역이 #menu를 품고있나 확인해 처리가 가능하다.