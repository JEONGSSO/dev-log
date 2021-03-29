ie로 웹서핑하는 사용자를 감지해

edge로 보내버리는 코드

```js
if (window.navigator.userAgent.match(/MSIE|Internet Explorer|Trident/i)) {
  window.location = "microsoft-edge:" + window.location.href;
}

// 바로 엣지로 새창열어서 해당주소로 보낼 수 있따
```

https://marshall-ku.com/web/tips/%EC%9D%B8%ED%84%B0%EB%84%B7-%EC%9D%B5%EC%8A%A4%ED%94%8C%EB%A1%9C%EB%9F%AC%EC%97%90%EC%84%9C-%EC%9E%90%EB%8F%99%EC%9C%BC%EB%A1%9C-%EC%97%A3%EC%A7%80%EB%A1%9C-%EC%A0%84%ED%99%98%ED%95%98%EA%B8%B0

구글, 애플, 페북, 인스타가 사용하는방법
https://stackoverflow.com/questions/63404573/how-to-redirect-from-internet-explorer-to-microsoft-edge-seamlessly

안내페이지로 이동시키고 엣지 새창으로 열기

```js
<script>
  if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    window.location = 'microsoft-edge:' + window.location;
    setTimeout(function() {
      window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
    //   https://support.microsoft.com/ko-kr/office/microsoft-edge%EC%97%90%EC%84%9C-%EC%9D%B4-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-%EB%B3%B4%EB%8A%94-%EA%B2%83%EC%9D%B4-%EC%A2%8B%EC%8A%B5%EB%8B%88%EB%8B%A4-160fa918-d581-4932-9e4e-1075c4713595
    }, 1);
  }
</script>
```
