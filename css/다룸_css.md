css 선택자는 class로 핸들링 되고, 태그네임으로 핸들링 X

단 사용빈도가 높은 li td th 태그는 제외

css 작성시 Depth는 3 Depth까지 허용 뎁스를 적게하는것을 권장.

## css 속성 선언 순서

1. display
2. overflow
3. float
4. position
5. z-index
6. width & height
7. margin & padding
8. border
9. font
10. background
11. etc


## font 속성 순서

축약형을 사용하지 않고, font-style -> font-variant -> font-size -> line-height -> font-famliy 순서 권장

## 컬러 값

축약 할 수 있으면 축약값을 사용
```css
.txt {color: #ffffff} //  X
.txt {color: #fff} // O
```


자식 선택자 
```css
div > a
```

인접 선택자 
```css
div + p
```

속성 선택자 
```css
[class='box']
[type='radio']
[name='id']
...
```

## css 우선순위

inline style -> id -> class -> element

## css 선택자 사용 방식

**OOCSS 권장** 

공통 클래스를 놓고 각 엘리먼트에 세부 클래스를 추가하는 방식


```html
<div>
   <button class="btn btn_submit">저장</button>
   <button class="btn btn_close">닫기</button>
</div>
```

```css
.btn {background-color:#fff}
.btn_close {color:#000}
.btn_submit {color:gray}
```