# canvas 요소

```html
<canvas id="tutorial" width="150" height="150"></canvas>

   width와 height의 크기를 지정하지 않는다면 기본값은 각각, 300, 150입니다.

```
---
### 대체 콘텐츠

canvas의 요소는 video, audio 처럼 img와는 달리, ie 9 이하의 버전이나 오래된 브라우저들을 위한 대체 컨텐츠를 정의하기 쉽습니다.

대체 콘텐츠를 제공하는 것은 매우 간단, canvas 태그 안에 대체 컨텐츠를 삽입.

~~ canvas를 지원하지 않는 브라우저는 컨테이너를 무시하고 내부의 대체 콘텐츠를 삽입.
~~ canvas를 지원하는 브라우저는 컨테이너 내부의 내용을 무시하고, 캔버스를 정상적으로 렌더링

---
### 렌더링 컨텍스트

canvas 엘리먼트는 고정 크기의 드로잉 영역을 생성하고 하나 이상의 렌더링 렌더링 컨텍스트를 노출하여 컨텐츠를 생성하고 다룸.

캔버스는 처음에 비어있기 때문에 스크립트로 접근해서 그리도록 할 필요가 있다.

canvas요소는 getContex()메서드로 그리기 함수를 사용할 수 있다.

```js
var canvas = document.getElementById('tutorial'); //id가 tutorial인 dom 탐색
var ctx = canvas.getContext('2d'); // 드로잉 컨텍스트에 엑세스
```

---
###   기본적인 템플릿 예제

```html
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8"/>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200,0,0)"; // ctx.fillstyle로 색상을 정하고,
        ctx.fillRect (10, 10, 50, 50); // ctx.fillRect(x, y, width, height)

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)"; // .5는 투명도
        ctx.fillRect (30, 30, 50, 50);
      }
    }
  </script>
 </head>
 <body onload="draw();">
   <canvas id="canvas" width="150" height="150"></canvas>
 </body>
</html>

```
초기 로딩 시에는 비어있고
body가 로드되면 draw()함수를 통해 캔버스에 그림을 그린다.

출처: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/canvas