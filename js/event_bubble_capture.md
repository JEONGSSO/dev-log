https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/

```html
<button>add item</button>
```

```js
var button = document.querySelector('button');
button.addEventListener('click', addItem); // 클릭 이벤트 추가

function addItem(event) {
	console.log(event);
}

```

예제 코드

```html
<body> 
   <div class="one">
      <div class="two">
         <div class="three"></div>
      </div>   
   </div>
</body>

```

```js
var divs = document.querySelectorAll('div');
divs.forEach(function(div) {
	div.addEventListener('click', logEvent);
});

function logEvent(event) {
	console.log(event.currentTarget.className);
}
```

## 이벤트 버블링

하위 클릭 이벤트가 최상위 요소인 body까지 이벤트가 전달되는 것

위의 예제에서 <div class="three"></div> 를 클릭하면 콘솔에

```
three
two
one
```

브라우저는 특정 화면 요소에서 이벤트 발생시 그 이벤트를 최상위 화면 요소까지 전파시킨다.

주의 할 점은 각 태그마다 이벤트가 등록 되어 있기때문에(divs.forEach)
상위 요소로 전달되는 것을 확인 가능

만약 특정 div 태그에만 달려있다면 ***버블링*** 되지 않음.

## 이벤트 캡쳐

이벤트 버블링이 하위 이벤트에서 최상위 요소 body까지 전달되는 것이라면
이벤트 캡쳐는 반대로 최상위 요소에서 하위 요소까지 이벤트가 전달되는 것

```js
var divs = document.querySelectorAll('div');
divs.forEach(function(div) {
	div.addEventListener('click', logEvent, {
		capture: true // default 값은 false입니다.
	});
});

function logEvent(event) {
	console.log(event.currentTarget.className);
}
```

위의 예제에서 <div class="three"></div> 를 클릭하면 콘솔에

```
one
two
three
```

처럼 기록이 됩니다.

## 이벤트 전파 막기

event.stopPropagation()는 해당 타겟 이벤트만 실행시키고 전파를 막습니다.

```js

function logEvent(event) {
	event.stopPropagation();
	console.log(event.currentTarget.className);
}

```

## 이벤트 위임

하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식입니다.

인풋을 클릭하면 얼럿이 뜨는 예제입니다.

```html
<h1>오늘의 할 일</h1>
<ul class="itemList">
	<li>
		<input type="checkbox" id="item1">
		<label for="item1">이벤트 버블링 학습</label>
	</li>
	<li>
		<input type="checkbox" id="item2">
		<label for="item2">이벤트 캡쳐 학습</label>
	</li>
</ul>
```

```js
var inputs = document.querySelectorAll('input');
inputs.forEach(function(input) {
	input.addEventListener('click', function(event) {
		alert('clicked');
	});
});
```

여기서 리스트에 할일이 추가된다면 추가된 리스트엔 이벤트가 붙어있지 않아 작동하지 않습니다.

```js
// 새 리스트 아이템을 추가하는 코드
var itemList = document.querySelector('.itemList');

var li = document.createElement('li');
var input = document.createElement('input');
var label = document.createElement('label');
var labelText = document.createTextNode('이벤트 위임 학습');

input.setAttribute('type', 'checkbox');
input.setAttribute('id', 'item3');
label.setAttribute('for', 'item3');
label.appendChild(labelText);
li.appendChild(input);
li.appendChild(label);
itemList.appendChild(li);
```

새로 리스트가 추가될때 마다 이벤트를 넣어 주는 것 보다 이벤트 위임으로 리스트 부모 요소에 이벤트를 자식들에게 전파할 수 있게 해주면 될 것 같다.

```js
// 이전 코드
// var inputs = document.querySelectorAll('input');
// inputs.forEach(function(input) {
// 	input.addEventListener('click', function() {
// 		alert('clicked');
// 	});
// });

// 이벤트 버블링으로 위임하는 코드
var itemList = document.querySelector('.itemList');
itemList.addEventListener('click', function(event) {
	alert('clicked');
});

```
## click 이벤트 내에 e.target, this, e.currentTarget 차이점?

```html
<div>
	<button>버튼</button>
</div>
```

```js
	const elem = document.querySelector('div');

	elem.addEventListner('click', function (e) {
		console.log(this) // <div>
		console.log(e.currentTarget) // <div>
		console.log(this === e.currentTarget) // true

		// 실제 이벤트가 시작된 타겟 요소
		console.log(e.target) // button

		// 이벤트 버블링으로 button에서 div로 이벤트가 전파된다.
	})
```

## addEventListner 인자 넘기기

```js
const a = 1
const b = 2

function handler1() {
	...
}

// 인자를 넘기고 싶었으나 즉시실행이 되어버림
elem.addEventListner('click', handler1(a, b)) 
elem.addEventListner('click', e => handler1(e))

function handler2(e) {
	otherFuntion(e, a, b) // 콜백함수 안에서 넘겨서 우회(?)할 수 있다.
}
elem.addEventListner('click', handler2)

```

https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/
https://poiemaweb.com/js-event
https://ko.javascript.info/bubbling-and-capturing