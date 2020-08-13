동작만 되는 수준

```css
.loadedData{
    animation: loadedOpacity .2s;
  }

/* oocss */
.skeleton {
    display: inline-block;
    animation: shine 2s infinite linear;
    background: linear-gradient(90deg, #ddd 0, #e8e8e8 40px, #ddd 80px);
  }

.skeleton.circle {
    border-radius: 50%;
    width: 80px;
    height: 30px;
}

.skeleton.rectangle {
    width: 50px;
    height: 50px;
}

@keyframes shine {
    0% {background-position: 0;}
    50% {background-position: 50px;}
    100% {background-position: 100px;}
  }

@keyframes loadedOpacity {
    0% {opacity: .3;}
    50% {opacity: .6;}
    100% {opacity: 1;}
  }

/*list가 비어있을때 적용되는 empty 사용*/
.list:empty {
    min-width: 50px;
    min-height: 50px;
    display: inline-block;
    animation: shine 2s infinite linear;
    background: linear-gradient(90deg, #ddd 0, #e8e8e8 40px, #ddd 80px);
  }

```
