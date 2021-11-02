## Beacon API

- 비동기 및 비차단 요청을 웹 서버로 보내는데에 사용
- 요청에 응답을 기대하지는 않음.
- XMLHttpRequest 또는 Fetch API 와는 달리 페이지가 unload 되기전에 비컨 요청을 시작하고 완료하는것을 보장
- 비동기적으로 동작

## 어디에 사용?

- 클라이언트에서 unload 이벤트가 트리거 될 때 이벤트 또는 세션 데이터등의 분석 데이터를 서버로 request 요청을 보내고자 할 때 주로 사용함

## 어떻게 사용?

- url
- data (optional)
  - ArrayBuffer -> 고정길이 이진 데이터 버퍼
  - ArrayBufferView -> TypeArray - Int8Array, Float32Array ... 등등을 담는 헬퍼 타입
  - Blob -> 텍스트 또는 이진 데이터로 읽거나 ReadableStream으로 변환해 데이터 처리하는데에 사용
  - DomString -> UTF-16 문자열
  - FormData -> form에서 일반적으로 쓰는 FormData === multipart/form-data
  - URLSearchParams -> 쿼리 문자열과 같이 작동하는 유틸리티 메서드

```ts
type Type = {
  url: string;
  data?:
    | ArrayBuffer
    | ArrayBufferView
    | Blob
    | DomString
    | FormData
    | URLSearchParams;
};

const hasRequest = navigator.sendBeacon(url, data);

// 브라우저가 요청을 대기열에 넣으면 메서드는 true를 반환 아니라면 false를 반환
```

## 사용법

### MDN 예제

```js
document.addEventListener("visibilitychange", function logData() {
  if (document.visibilityState === "hidden") {
    navigator.sendBeacon("/log", analyticsData);
  }
});
```

### 웹 체크아웃 기능 만들때 사용

```js
window.addEventListener("unload", function checkOut() {
  navigator.sendBeacon("/room/123", roomData);
});
```

## 참조

https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon
