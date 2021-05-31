## observable

1. makeObservable

   - 안의 내용들을 직접 지정해주는 방식

   ```js
   // 클래스에서
    constructor(value) {
      makeObservable(this, {
          value: observable,
          double: computed,
          increment: action,
          fetch: flow
      })
      this.value = value
    }

    // 함수형에서 사용하는 방법을 찾으면 업데이트
   ```

2. makeAutoObservable (super를 갖고 있거나(상속받은 경우), subclass를 갖고 있는 경우(상속하는 경우)에는 사용할 수 없다.)

   - 1. makeObservable처럼 직접 지정이 아닌 mobx에서 추론하여 사용

   ```js
   // 클래스 에서
   class Doubler {
     value = 0;

     constructor(value) {
       makeAutoObservable(this);
     }

     increment() {
       this.value++;
       this.value++;
     }
   }

   // 함수형에서
   function createDoubler(value) {
     return makeAutoObservable({
       value,
       get double() {
         return this.value * 2;
       },
       increment() {
         this.value++;
       },
     });
   }
   ```

3. observable

   ```js
    // 클래스 makeObservable안에서 사용하는 방법
    constructor(value) {
      makeObservable(this, {
        value: observable,
      })
    }

    // 함수형에서
    export default observer(() => {
      const { counter } = useStore();
      return (
        <div>
          <button onClick={() => counter.decrement()}>-</button>
          <span role="display-count">{counter.number}</span>
          <button onClick={() => counter.increment()}>+</button>
        </div>
      );
    });
   ```

## [actions](https://mobx.js.org/actions.html)

- 상태 변경 코드
- 원칙적으로 이벤트에 항상 반응한다. (버튼 클릭, 인풋, 웹소켓 수신)
- action은 트랜잭션이 적용됨

### action을 만드는 방법

1. makeObservable
2. makeAutoObservable
3. action.bound
4. action(fn)
5. runInAction(fn)

### action 사용

```js
// 1.makeObservable 클래스에서 사용법
...
constructor(value) {
  makeObservable(this, {
    value: observable,
    increment: action // 액션 추가
  })
}
...

// 4. action 함수형 사용
const state = observable({ value: 0 })

const increment = action(state => {
    state.value++
    state.value++
})

increment(state);

```

### action.bound

```js

// 1. makeObservable
constructor(value) {
  makeObservable(this, {
    value: observable,
    increment: action.bound // 3.action.bound  this가 알맞게 바인딩되게 만들어줌
  })
}

// 2. makeAutoObservable, 3. action.bound
constructor(value) {
  makeAutoObservable(this, {}, { autoBind: true }) // makeAutoObservable로 옵저버를 만들 때 적어도된다.
}
```

## runInAction

```js
// 5. runInAction 클래스에서
class Test {
  list = [];
  loading = false;

  @action // 데코레이터 사용
  async getBaseballList() {
    ...
    runInAction(() => {
      this.list = res.data; // 값 변경시에 사용
      this.loading = true;
    });
  }
}

// 5. runInAction 함수형에서
const state = observable({ value: 0 });

runInAction(() => {
  state.value++;
  state.value++;
});
```
