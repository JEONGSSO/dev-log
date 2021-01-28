ie로 웹서핑하는 사용자를 감지해

edge로 보내버리는 코드

```js
if (window.navigator.userAgent.match(/MSIE|Internet Explorer|Trident/i)) {
    window.location = "microsoft-edge:" + window.location.href;
}

// 바로 엣지로 새창열어서 해당주소로 보낼 수 있따

```
https://marshall-ku.com/web/tips/%EC%9D%B8%ED%84%B0%EB%84%B7-%EC%9D%B5%EC%8A%A4%ED%94%8C%EB%A1%9C%EB%9F%AC%EC%97%90%EC%84%9C-%EC%9E%90%EB%8F%99%EC%9C%BC%EB%A1%9C-%EC%97%A3%EC%A7%80%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0