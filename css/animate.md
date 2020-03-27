# animation

```css
animate: animation-name 1s steps(5);

//해당 키프레임(animation-name)이 1초에 걸쳐서 5스텝씩 움직일것
스텝이 클수록 더 부드러워진다.;
 @keyframe animation-name {
  0% {
    backgound-position: ~~;
  }
  50% {
    backgound-position: ~~;
  }
  100% {
    backgound-position: ~~;
  }
}
```

default 값

```css
animation-name: none
animation-duration: 0s
animation-timing-function: ease
animation-delay: 0s
animation-iteration-count: 1
animation-direction: normal
animation-fill-mode: none
animation-play-state: running

```

자바스크립트에서 미리 정의해둔 animation-name을 style로 주입해주면 바로 움직인다.
