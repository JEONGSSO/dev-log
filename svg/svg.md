# SVG란?
Scalable Vector Graphics의 약자.
SVG는 XHTML과 비슷한 XML언어로 그래픽을 그리는데에 사용된다.

---
## 기본적인 요소들      


원, 사각형, 간단한 곡선, 복잡한 곡선을 그릴 수 있는 요소들을 제공한다. svg 요소

간단한 SVG문서는 루트 요소와 그래픽을 구성하기 위한 몇몇 기본 도형들로 구성된다.

또, g 요소를 통해 간단한 모양들을 조합할 수 있다.

그라디언트, 회전, 필터, 애니메이션, js를 통한 조작을 지원한다.

---
## 간단한 예제


### 사각형

```html
<svg width="200" height="150">

    <rect width="200" height="150" stroke="orange" stroke-width="5" fill="yellow"/>

    이 문장은 사용자의 웹 브라우저가 svg 요소를 지원하지 않을 때 나타납니다!

</svg>

```

|속성|설명|
|---|---|
|width|너비 설정|
|width|높이 설정|
|stroke|테두리 색상|
|stroke-width|테두리 굵기|
|fill|채울 색상 선택|
|opacity|도형 투명도 설정|

---
### 모서리가 둥근 사각형
```html
<svg width="250" height="200">

    <rect width="200" height="150" x="20" y="20" rx="20" ry="20"

        stroke="orange" stroke-width="5" fill="yellow"/>

</svg>

```
|속성|설명|
|---|---|
|x|사각형의 왼쪽 위 꼭짓점의 x좌표를 설정|
|y|y좌표를 설정|
|rx|사각형 모서리 굴곡의 x축 반지름을 설정함.|
|ry|y축 반지름 설정|

---
### 선 그리기

```html
<svg width="250" height="200">

    <line x1="50" y1="50" x2="200" y2="150" stroke="orange" stroke-width="5"/>

</svg>
```

|속성|설명|
|---|---|
|x1|선이 시작될 위치의 x좌표|
|y1|y좌표를 설정|
|x2|선이 끝나는 위치의 x좌표|
|y2|y좌표를 설정|


---
### 원 그리기
```html
<svg width="300" height="300">

    <circle cx="150" cy="120" r="100" stroke="orange" stroke-width="5" fill="yellow"/>

</svg>
```

|속성|설명|
|---|---|
|cx|원의 중심 x좌표를 설정|
|cy|y좌표를 설정|
|r|원의 반지름을 설정|

---

### 타원 그리기
```html
<svg width="300" height="300">

    <ellipse cx="150" cy="100" rx="120" ry="70" stroke="orange" stroke-width="5" fill="yellow"/>

</svg>
```

|속성|설명|
|---|---|
|cx|타원 중심의 x좌표를 설정함|
|cy|y좌표를 설정|
|rx|타원의 x축 반지름을 설정함.|
|ry|y축 반지름|

---
### 다각형 그리기 (예제 별)

```html
<svg width="300" height="300">

    <polygon points="10,100 190,100 30,200 100,40 170,200"

       stroke="orange" stroke-width="5" fill="yellow"/>

</svg>
```

|속성|설명|
|---|---|
|points|다각형의 각 꼭짓점이 표시될 위치의 좌표를 설정함.|