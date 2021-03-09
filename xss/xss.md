cross site scripting
자바스크립트 코드를 삽입해 개발자가 고려하지않은 기능을 작동시키는 공격방식

- Persistent XSS

게시판 등에 스크립트 코드를 입력해 공격하는 방식

- 예시 1 : <img src="" onerror="alert('으왘!');">
- 예시 2 : <img src="" onerror="window.open('ht'+'tps:'+'//naver.com','_blank')">
- 예시 3 : <img src="" onerror="opener.close();">

* Reflected XSS

악의적인 스크립트와 URL을 누르도록 유도하고 누르면 스크립트가 실행되며 공격당함.

- DOM based XSS

돔을 그릴때 스크립트를 실행하는 방법으로 공격하는 방식.

```js
document.write("<script>악성 코드</script>");
```

https://noirstar.tistory.com/266
