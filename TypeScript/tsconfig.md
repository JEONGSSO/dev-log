## ts 옵션 살펴보기

개인 프로젝트에서 사용하는 tsconfig

```json
{
  "compilerOptions": {
    "noEmit": true, // 컴파일러가 js파일등의 출력 파일들을 만들어 내지 않도록 하는 설정, 즉 다른 babel등의 도구로 컴파일하여 js파일로 변경 하는것
    "target": "ESNext", // 사용할 ES버전 설정
    "module": "commonJS", // 모듈 시스템 설정, commonjs, amd, umd, system ...
    "strict": true, // 엄격한 타입 체킹 사용 여부
    "importHelpers": true, // ts -> js 컴파일 과정에서 사용하는 helper함수들을 모듈로 분리 -> 용량 소비를 줄일 수 있음.
    "moduleResolution": "node", // 모듈 해석 옵션
    "experimentalDecorators": true, // ES7의 decorators에 실험적 지원 여부
    "esModuleInterop": true, // 모든 imports에 대한 namespace 생성을 통해 commonJS와 modules 상호운용성 여부, 밑의 allowSyntheticDefaultImports를 암시적으로 승인
    "allowSyntheticDefaultImports": true, // default export가 아닌 모듈에서 default import가 가능하게 할지 여부
    "noImplicitAny": true, // any타입 에러 표시여부
    "sourceMap": true, // .map파일 생성여부
    "lib": ["esnext", "dom", "dom.iterable"], // 컴파일에 포함될 라이브러리 목록
    "types": ["node", "jest", "@testing-library/jest-dom"], // 컴파일중 포함될 타입 정의 파일 목록
    "downlevelIteration": true, // EX) ES6미만 타겟을 설정 후 ES6의 문법을 지원할 것인가?
    "baseUrl": "src" /* non-absolute한 모듈 이름을 처리할 기준 디렉토리 ex) paths에서 사용하는 @같은거 */,
    "paths": {
      "@/*": ["*"] // baseUrl 안에서의 @ alias를 선언
    },
    "jsx": "react-jsx" // jsx 코드를 어떻게 컴파일 할지 설정 only tsx file for effect
  },
  "exclude": ["node_modules"] // 컴파일 제외 목록 기본적으로 node_modules, bower_components, jspm_packages 그리고 <outDir>를 제외.
}
```

---

## 참조

https://geonlee.tistory.com/214

https://it-eldorado.tistory.com/128
