```js

$('#tt').click(function (e) {
   e.target.style.animationName = "tt";
});

```

```css


#tt {animation-duration: .7s;}
 @keyframes tt {
    0% { transform:scale(.3); }
    20% { transform:scale(1.1); }
    40% { transform:scale(.9); }
    60% { transform:scale(1.03); }
    80% { transform:scale(.97); }
    100% { transform:scale(1); }
 }

```

해당 내용을 두둥실 하게 표현
