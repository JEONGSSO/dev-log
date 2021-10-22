## TDD(Test Driven Development) 프로세스

- 작은 단위들의 테스트를 구현하여 개발하는 방법론
- 함수의 테스트나

### RED - GREEN - REFACTOR

![RED GREEN REFACTOR](https://saucelabs.com/sauce-labs/blog-images/bdd-workflow-600x268.png)

https://saucelabs.com/blog/a-two-minute-bdd-overview

1. RED 테스트 실패

   - 구체적인 하나의 요구사항을 검증하는 테스트를 추가한다.
   - **추가된 테스트가 실패하는지 확인**.
     - 실패 해야하는 이유는 실패를 했다는것을 확인해야 검증이 가능하다고 신뢰할 수 있기 때문이다.

2. GREEN 테스트 성공

   - 추가된 테스트를 포함하여 모든 테스트가 성공하게끔 변경.
   - 테스트의 성공은 모든 describe을 만족함을 의미.
   - **테스트 성공을 위한 가장 최소한의 코드만 입력(수단 방법 X)**
     - 최소한의 코드 그 이상을 변경하거나 추가하면 사이드 이펙트가 있을 수 있기 때문에 추가하지 말자.

3. REFACTOR 리팩토링
   - GREEN에서 일단은 돌아가게(만) 만든 테스트의 비즈니스 로직을 개선하자.
   - 구현 설계를 개선하고 **가독성**, **적용성**, **성능**을 고려하여 리팩토링 진행

## BDD(Behavior Driven Development) 프로세스

- 행위에 집중하여 개발하는 방법론
- 기획서에 있는 시나리오를 바탕으로 코드를 작성하여 테스트하는 것

### Feature - Scenario - Given - When - Then

- Feature -> 테스트 할 기능
- Scenario -> 테스트의 목적 (무엇을?)
- Given -> 초기 세팅(데이터, UI)등
- When -> 어떠한 행동을 가할때, 테스트 케이스
- Then -> 성공했을때 기대한 결과값?

![BDD](https://www.testmanagement.com/wp-content/uploads/2019/05/g-w-t-v2.png)

https://www.testmanagement.com/solutions/bdd-with-testcomplete-and-hiptest/

| X                 | TDD                                 | BDD                                 |
| ----------------- | ----------------------------------- | ----------------------------------- |
| 테스트 목적?      | 기능 동작의 검증                    | 서비스 시나리오 동작 검증           |
| 테스트 설계 중심? | 제공할 모듈 기능 중심               | 사용자 행위 중심                    |
| 테스트 설계 재료? | 모듈 사양 문서                      | 서비스 기획서                       |
| 프로젝트 적합도?  | 모듈/라이브러리                     | 서비스 프로젝트                     |
| 장점              | 설계 단계에서 예외 케이스 확인 가능 | 설계 단계에서 누락된 기획 확인 가능 |

## 참조

---

https://juunone.netlify.app/development/bdd/
https://mingule.tistory.com/43
