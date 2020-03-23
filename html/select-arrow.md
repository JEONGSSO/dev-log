```css
 .arrow::after {
   content: "";
   position: relative;
   width: 10px;
   height: 10px;
   background: url() no-repeat;
   float: right;
   background-position: ;
   pointer-events: none;
   top: 50px;
   right: 10px;
}

```

셀렉트 박스는 가상클래스가 사용이 안되니 
부모에다가 가상클래스로 위치를 맞추어 준다.

pointer-events 옵션은 클릭을 없애준다.