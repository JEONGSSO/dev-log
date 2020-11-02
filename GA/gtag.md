# 구글 태그 관리자

마케팅에서의 태그는 js(html/css를 동적으로 제어하는 객체 기반의 프로그래밍 언어)로 만든 코드, 데이터를 수집해 서드 파티로 전달하는 역할.

추적 코드에서 스크립트를 받을 수 있는데, 이 코드를 

```html
<head>
   <!-- Global site tag (gtag.js) - Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=UA-번호"></script>
   <script>
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());

   gtag('config', 'UA-번호');
   </script>
</head>
```

이렇게 추가하면 된다. 
head에 추가하는 이유는 사용자가 들어왔다 빠른시간안에 나올 경우 수집이 제대로 되지 않는 문제를 최소화 하기 위함이다.

크롬 확장자 도구나, ga 웹페이지에서 확인할 수 있다.

클릭 이벤트

```js
    function gaEventer(category, label, event) {
      event = event || 'click'; // 대소문자 규약
      gtag('event', event, {
        'event_category': category,
        'event_label': label,
      });
    };
```

참고: https://analyticsmarketing.co.kr/digital-analytics/google-tag-manager-basics/3002/

