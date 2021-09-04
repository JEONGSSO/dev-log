## ts eslint:recommended 간략 설명

[https://www.npmjs.com/package/@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)

```bash

[@typescript-eslint/adjacent-overload-signatures](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md)

→ 같은 이름의 함수 오버로드하여 사용할때 한곳으로 모을 것

[@typescript-eslint/await-thenable](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/await-thenable.md)

→ thenable하지 않은 값에 await 쓰지 말 것

[@typescript-eslint/ban-ts-comment](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/ban-ts-comment.md)

→ @ts-expect-error, ts-ignore, @ts-nocheck 허용하지 않음 — @ts-check 허용

[@typescript-eslint/ban-types](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/ban-types.md)

→ default

String, Number 대문자 타입 사용하지 말기,

Function type 사용하지말기

{} 빈 오브젝트 대신 Record<string, unknown>으로 대신하기

[@typescript-eslint/explicit-module-boundary-types](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md)

→ 인자 및 리턴 명확히

[@typescript-eslint/no-empty-interface](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-empty-interface.md)

→ 비어있는 인터페이스 사용 여부

[@typescript-eslint/no-explicit-any](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-explicit-any.md)

→ any를 사용 에러 여부

[@typescript-eslint/no-extra-non-null-assertion](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md)

→ 이미 nullish한 값에 굳이 optional chaning 연산자 사용 여부

[@typescript-eslint/no-floating-promises](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-floating-promises.md)

→ 의미없는 promise 콜백쓰지말자 ex) .then().catch()

ignoreVoid void : 리턴값을 사용할 수 있나요 기본값 true

ignoreIIFE : 즉시실행 함수를 사용할 때 ?? 기본값 false

[@typescript-eslint/no-for-in-array](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-for-in-array.md)

→ for in 쓰면 문제 제기할까?

[@typescript-eslint/no-inferrable-types](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-inferrable-types.md)

→ 타입이 추론되는거는 어노테이션 하지말까

ignoreParameter 파라메타 어노테이션 할꺼 기본값 false

ignoreProperties 프로퍼티 어노테이션 할꺼 기본값 false

[@typescript-eslint/no-misused-new](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-misused-new.md)

→ new를 올바르게 사용하지 않으면 에러 발생시킬까?

ex) interface에 constructor 넣는다던지, 클래스 키 값으로 new사용한다던지

[@typescript-eslint/no-misused-promises](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-misused-promises.md)

→

[@typescript-eslint/no-namespace](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-namespace.md)

→

[@typescript-eslint/no-non-null-asserted-optional-chain](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md)

→ optional chaning 뒤에 !(non null assertion)사용 ㄴㄴ 3.9 버전 이상에서는 문제없다

[@typescript-eslint/no-non-null-assertion](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-non-null-assertion.md)

→ optional 값일때 optional chaning 의미있는 상황에서만 넣어라

ex) foo.bar!.toString()

[@typescript-eslint/no-this-alias](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-this-alias.md)

→ this를 별칭으로 사용하지 말아라 ex) self

allowDesc~~ 구조분해할당

allowedName 허용할 이름 배열

[@typescript-eslint/no-unnecessary-type-assertion](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md)

→ 의미없는 타입 assertion으로 사용하지말자

추론을 통해서 타입을 정의하지말자?

[@typescript-eslint/no-unsafe-assignment](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md)

→ 타입 어설션 으로 any 설정했을때 에러 여부

unknown은 예외

[@typescript-eslint/no-unsafe-call](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-unsafe-call.md)

→ 함수의 리턴값 타입을 명확하게 (any 말고) 명시여부

[@typescript-eslint/no-unsafe-member-access](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md)

-> any타입인 변수 및 객체(안에)를 사용하여 프로퍼티 접근할 때 여부

[@typescript-eslint/no-unsafe-return](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-unsafe-return.md)

-> any타입으로 리턴하는것을 금지할지? 리턴타입을 (단, unknown타입을 리턴한다 선언 후 any 타입 리턴은 예외)

[@typescript-eslint/no-var-requires](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/no-var-requires.md)

-> require를 사용하여 변수에 담는것을 금지할지?

[@typescript-eslint/prefer-as-const](https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/packages/eslint-plugin/docs/rules/prefer-as-const.md)

-> 변수의 값과 타입이 같을때 어설션을 할꺼면 const로 해라

```
