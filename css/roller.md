```css
   .up-ani {
    position: relative;
    display: inline-block;
    line-height: 1;
    animation: upani .2s forwards linear
  }

  .number {
    position: relative;
    display: inline-block;
    line-height: 1;
    animation: defaultani .2s forwards linear
  }

  .up-ani span:not(:first-child) {
    position: absolute;
    left: 0;
    top: 100%;
  }

  @keyframes upani {
    0% {
      transform: translateY(0)
    }

    100% {
      transform: translateY(-1em)
    }
  }

  @keyframes defaultani {
    0% {
      transform: translateY(1em)
    }

    100% {
      transform: translateY(0em)
    }
  }
```
요런 모양새