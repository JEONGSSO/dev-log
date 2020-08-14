# react-helmet

html title을 페이지 별로 바꾸어주는 라이브러리

```html
<!-- jsx -->
import React from “react”;
import { Helmet } from “react-helmet”;

class Application extends React.Component {
  render () {
    return (
        <div className=”application”>
            <Helmet>
                <meta charSet=”utf-8” />
                <title>My Title</title>
                <link rel=”canonical” href=”http://mysite.com/example” />
            </Helmet>
            ...
        </div>
    );
  }
};
```
이런식으로 Helmet 컴포넌트 안에 title태그로 페이지 별로 타이틀을 만들어 줄 수 있다.