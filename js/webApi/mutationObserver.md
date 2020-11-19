```js

//해당 엘리먼트를 감시하고 싶을때 사용

const target = document.querySelector('#some_target')

const observer = new MutationObserver(function(mutations) {
   mutations.forEach(mutation => {console.log(mutation)})
})

// 옵션
const config = {
   childList: true
}

```

|속성|값|설명|
|---|---|---|
|childList|true, false|대상 노드의 하위요소 추가 및 제거를 감시
|attributes|true, false|대상 노드의 속성 변화 감지
|characterData|true, false|대상 노드의 데이터 변화 감시
|subtree|true, false|대상 노드의 자식, 손자 이후도 모두 감지
|attributeOldValue|true, false|대상 노드의 속성 변경 전의 내용
|characterDataOldValue|true, false|대상 노드의 데이터 변경 전 내용
|attributeFilter|["A", "B"]|특정 속성만 필요로 할때 배열로 적음.

<br>
<br>
<br>

출처 https://uxgjs.tistory.com/170