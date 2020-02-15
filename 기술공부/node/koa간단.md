node.js의 가장 유명한 웹 프레임워크 express를 만든 개발자들이 만드는 웹 프레임워크

ES6 문법을 가장 적극적으로 지원하는 프레임워크 generator 함수를 사용하여 

요청과 응답을 처리하는 것이 가장 큰 특징이다.

Generator(제네레이터)

제네레이터는 JS의 특수한 함수
 
```js
// 화살표 함수는 사용을 못하는 것으로 나와있다.
function* 제네레이터(flag) {
	yield "첫 번째 yield 리턴" // 2. yield 오른쪽의 내용을 객체로 리턴하고 제어권을 메인으로 넘김
	yield "두 번째 yield 리턴" // 4. 2와 마찬가지, yield키워드를 만나지 않거나 return을 만나기 전까지 반복
	// 6. yield 문이 없으면 {value: undefined, done: true} 리턴
    // yield보다 return이 먼저 호출되면 제너레이터는
    // 순회를 완료시키고 { value : 'undefined', done : true } 를 리턴한다.
}
```

```js
let gen_obj = 제네레이터()

gen_obj.next() // 1. 제너레이터 함수에게 제어권을 넘김
{value: "첫 번째 yield 리턴", done: false}

gen_obj.next() // 3. 제네레이터 함수에게 제어권을 넘김
{value: "두 번째 yield 리턴", done: false}

gen_obj.next() // 5. 넘김 
{value: undefined, done: true}
 ```

gene 함수를 호출하면 내부적 제네레이터 객체를 리턴

제네레이터 객체에서 next 메소드를 호출하면 제어권을 제네레이터에게 넘기고

내부에 yield를 만나면 메인으로 제어권을 넘겨준다.

 
| X    | 일반함수            | 제너레이터                   |
| ---- | --------------- | ----------------------- |
| 리턴시점 | return 키워드 실행 시 | yield 키워드 실행 시          |
| 선언방법 | function        | function*               |
| 리턴타입 | 모든 타입 리턴        | 제너레이터 객체 리턴             |
| 호출방법 | 함수명 ()          | 제너레이터 객체의 next() 메서드 호출 |

출처: https://kim1124.tistory.com/2
