## 의미있는 태그 사용하기

검색봇이 이해하기 쉽게 태그를 의미가 있는 태그들로 구성하는 것.

------

## 시멘틱 태그 요소?

### non-semantic Element

대표적으로 span 과 div 요소는 아무런 의미를 가지고 있지 않습니다.

## semantic tag

| 태그            | 의미                   |
| --------------- | ----------------------- |
| header | 문서의 header 의미|
| nav | 문서의 nav 의미 |
| main |문서의 주요 콘텐츠 의미|
| footer | 문서의 하단을 의미|
| aside | 문서와 간접적으로 연관된 부분만을 나타냄|
| section | 문서의 독립적인 구획 |
| article | 문서, 페이지, app또는 사이트 안에서 독립적으로 구분, 재사용할 수 있는 구획을 의미 |
| address | 주소를 의미 |

-----

## h1~6 태그 
```html

h1 태그는 이 html에서 가장 중요한 제목으로 인식하여 인덱스에 포함시킬 확률이 높다.

<h1>제목</h1>
~~~
<h6>제목</h6>

h5 부터는 거의 사용하지 않습니다.

```



## 올바른 태그 사용하기
```html
 <div id="header"></div>

 대신

 <header></header>

```

더 많은 태그들은 mdn에서 확인할 수 있다
https://developer.mozilla.org/ko/docs/Web/HTML/Element