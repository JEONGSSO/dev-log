# float 적용된 박스에 overflow: hidden으로 레아이웃 잡기

```html
<!DOCTYPE html>
<html lang="en">
   <head>
      
      <style>
      .wrap{border: 1px #F00 solid; }
      .left_box{border: 1px #F00 solid; width: 200px; height: 200px; float:left;}
      .test_box{border: 2px #0F0 solid; width: 200px; height: 200px;}
      
      </style>
   </head>
   <body>
   
   <div class="wrap">
      <div class="left_box"></div>
   </div>
   </body>
</html>
```

이렇게 적용하면 부모(wrap)의 left_box는 float로 인해 부모는 left_box의 크기를 잡지 못하기때문에 줄어들고, left_box는 float: left로 왼쪽에 떠있는 상황

이 때 wrap에 overflow: hidden을 사용하면 부모는 left_box의 크기를 잡아 원하는 모양이 나온다.

1. height: auto는 자신을 포함한 컨텐츠의 높이값을 자신의 높이로 잡는것. 근데 left_box를 float 했을때 부모는 자식의 크기를 잡지 못해 줄어듬.
2. overflow: hidden은 주어진 사이즈만큼만 보여줌 자신에게 주어진 사이즈만 나타내고 크기를 넘어서는것은 숨기는건데
3. wrap에 overflow: hidden을 주면 wrap은 주어진 만큼의 height를 가지고 넘어가는것은 숨김, 부모의 주어진 높이는 부모가 포함하는 컨텐츠의 높이가 된다. 즉 left_box의 크기를 잡아 의도한대로 구현하는 것.

사이즈 변화가 없을 것 같은 부분을 height를 고정값으로 아닌곳에는 부모에 overflow: hidden을 사용,
반응형 같은 경우는 min, max를 사용해서 어느정도 해결할 수 있다.