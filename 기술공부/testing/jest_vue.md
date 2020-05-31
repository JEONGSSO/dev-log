페이스북이 만든 테스트 프레임워크

Jasmine을 기반으로 만들어서 유사하다.

```js
let count = 0;
describe('클릭 테스트', () => {
  //it과 test는 같은 동작을 한다.
  it('+1', () => {
    const count = document.querySeletor('#increse_btn').innerText;
    expect(count).toBe(1); //toBe 는 정확한 동등을(객체 동등) 테스트하기 위해 Object.is를 사용한다.
    // 버튼의 값   // 예상되는 값
    expect(count).not.toBe(1); // 위 예측과 반대
  });

  test('-1', () => {
    const count = document.querySeletor('#increse_btn').innerText;
    expect(count).toEqual(1); //오브젝트의 값을 체크하기를 원한다면 대신 toEqual를 사용.
    // 버튼의 값   // 예상되는 값
  });

  const mockcallback = jest.fn((f) => f + 2);

  it('mockTest', () => {
    [1].forEach(mockcallback);
    expect(mockcallback.mock.results[0].value).toBe(3);
    //임의의 함수를 nockCallBack함수로 만들어 테스트 하는것도 가능하다.
  });
});
```

React 테스팅 도구는

[enzyme](https://enzymejs.github.io/enzyme/) 이나

[react-testing-library](https://testing-library.com/docs/react-testing-library/intro)를 사용하면되고

Vue와 같이 사용할 예정이므로 Vue에서 공식지원하는
[Vue-test-utils](https://vue-test-utils.vuejs.org/)을 사용할 예정이다.

```js
import { shallowMount } from '@vue-test-utils';
import App from './App';

const app = shallowMount(App); // App의
const data = app.vm.$data; // vue의 data를 사용할 수 있다.
const totalCount = app.find('.totalCount'); // 제이쿼리 처럼 app안의 class totalCount를 찾아줌
```
