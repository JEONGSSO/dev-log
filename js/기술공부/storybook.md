# 스토리북

보일러 플레이트 코드로 진행. storybook cli가 아닌 수동으로 만들기

[https://storybook.js.org/docs/guides/guide-react/](https://storybook.js.org/docs/guides/guide-react/)

스토리북은 컴포넌트 단위의 개발 환경을 지원하는 도구

스토리북은 사실 테스트 도구라기 보다는**UI 개발 환경**에 가깝다. 스토리북의 가장 큰 목적은 "**UI 컴포넌트를 애플리케이션 외부의 독립된 환경에서 개발할 수 있도록**" 하는 것이다. 하지만 우리가 일반적으로 사용하는 테스트 도구가 "모듈 혹은 함수를 애플리케이션 외부의 독립된 환경에서 실행해서 결과를 검증할 수 있도록" 돕는다는 것을 생각해보면, 스토리북도 테스트 도구의 역할을 일부 수행하고 있다는 것을 알 수 있을 것이다.

[https://meetup.toast.com/posts/178](https://meetup.toast.com/posts/178)

> npm i -D @storybook/react

설치 해주고

루트 폴더에 .storybook 폴더를 생성하고 config.js파일을 만든다.

```
import {configure} from '@storybook/react'

const req = require.context('.../src/component', true, /.stories.js$/) // 스토리북 사용을 위해 폴더 명시

const loadStories = () =>  { 		//스토리가 많아질수록 코드 많이 생기기 때문에 루프로 처리
   req.keys().forEach(filename  => req(filename ))
}

configure(loadStories, module)
```

그 후 src/component 폴더에 Button.stories.js 파일 생성

```
import React from 'react';
import { storiesOf } from '@storybook/react'

import { Button } from './Button'

storiesOf('Button', module).add('with background', () =>
    <Button bg={'red'}> Hello World </Button>
)
```

> storiesOf 함수  
> 스토리를 등록하고 여러개의 스토리를 관리 할 수 있는 객체를 반환  
> 첫 번째 인자는 일종의 카테고리 명 같은 역할 등록되는 스토리들을 하나의 카테고리로 묶어서 표시  
> 두 번째 인자인 module은 내부적으로 HMR을 사용해 적용해주기 때문에 항시 전달 필수

> add 메소드  
> storiesOf가 반환해준 객체에게 add 메소드를 사용해 스토리를 등록  
> 첫 번째인자는 스토리의 이름,  
> 두 번째 인자는 컴포넌트 렌더링을 위한 리액트 엘리먼트를 반환하는 함수
