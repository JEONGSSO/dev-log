https://studiomeal.com/archives/533

flex와 다른점
flex는 한 방향 1차원 레이아웃 시스템 (가로면 가로만, 세로면 세로만)

grid는 두 방향 2차원 시스템 (가로세로 유연하게 적용가능)

flex 처럼
컨테이너에 display: grid;를 선언하는것으로 시작!

```css
#test {

    /* 자식 요소의 열 크기를 각각 200 200 500으로 설정한다는 의미  */
    grid-template-columns: 200px 200px 500px;

    /* fr은 비율 설정 1:1:1 크기의 열을 세개 만든다는 것. */
    grid-template-columns: 1fr 1fr 1fr;  

    /* repeat로 반복 처리 가능. */
    grid-template-columns: repeat(3, 1fr);  
    
    /* row를 최소한 100px 최대는 auto로 늘어나게! */
    grid-template-rows: repeat(3, minmax(100px, auto)); 
    
    /* auto-fill은 20%로 설정하면 5개를 채워줌 셀 개수가 모자라면 공간이 남음 */
    grid-template-columns: repeat(auto-fill, minmax(20%, auto)); 
    /* auto-fit은 셀 개수가 모자라면 자동으로 넓혀주는 것. */
    grid-template-columns: repeat(auto-fit, minmax(20%, auto)); 
}
```

**간격 주기**

```css

/*row의 간격을 10px로*/
row-gap: 10px; 

/*column의 간격을 10px로*/
column-gap: 10px; 

/* 모든 그리드 아이템에 10px로 간격 주는 것 gap = grid-gap*/
gap: 10px;
grid-gap: 10px;
```

**그리드 형태를 자동으로 정의**

```css
grid-template-rows: repeat(3, minmax(100px, auto));

/* 방금 위에서 repeat 3을 주었는데 row의 갯수를 알 수 없는경우에 grid auto를 사용한다. */
grid-auto-rows: minmax(100px, auto);
```

**각 셀의 위치를 정하기**

컬럼이이 5개면 컬럼 마지막 오른쪽줄의 번호는 6이다.

| 1 | 2 | 3 | 4 | 5 | <- 6
```css

.item {
    /*컬럼 두칸을 먹는당*/
	grid-column-start: 1;
	grid-column-end: 3; 

    /*로우 한칸을 먹는당*/
	grid-row-start: 1;
	grid-row-end: 2;
}

/*위 코드와 동일한 코드(축약)*/
.item:nth-child(1) {
	grid-column: 1 / 3;
	grid-row: 1 / 2;
}

/*몇 개의 셀을 차지하게 할 것인지 정할 수 있따.*/

.item:nth-child(1) {
    
    /*1번 column에서 2칸*/
	grid-column: 1 / span 2;

    /*1번 row에서 3칸*/
	grid-row: 1 / span 3;
}

.container {
	grid-template-columns: 50px;
	grid-auto-columns: 1fr 2fr;
}
.item:nth-child(1) { grid-column: 2; }
.item:nth-child(2) { grid-column: 3; }
.item:nth-child(3) { grid-column: 4; }
.item:nth-child(4) { grid-column: 5; }
.item:nth-child(5) { grid-column: 6; }
.item:nth-child(6) { grid-column: 7; }

/*grid-column: 1번은 따로 지정해주지 않았기에 container의 column의 50px을 적용받는다.*/

/*나머지는 grid-auto-columns의 규칙으로 1:2비율로 계속 정렬된다.*/

```

*영역 이름으로 그리드 정의*
