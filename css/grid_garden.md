https://cssgridgarden.com/#ko

grid-column-start 는 시작 지점을 정할 수 있따  
grid-column-end 는 여러 열로 확장 할 수 있다.

```css

#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#water {
    grid-column-start: 1;
    grid-column-end: 5;
}
