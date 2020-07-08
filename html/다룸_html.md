```html

서비스명은 문서 제목에서 가장 뒷부분에 위치
<title>Daum 영화</title>

```

### 컨텐츠 제목

- 하나의 컨텐츠를 대표하는 페이지의 경우 반드시 해당 컨텐츠 제목을 문서 제목에 표기
- 컨텐츠 제목은 문서 제목에서 가장 앞부분
- 컨텐츠 제목과 서비스명 간의 구분자는 - 대신 (&ndash)기호를 사용

### Attribute 우선순위

Attribute값은 큰 따옴표로 묶는다.
Attribute 우선순위는 다음 순위를 따른다

1. rel
2. type
3. href, src
4. width, height
5. target
6. id
7. name
8. class
9. style
10. title, alt
11. 기타

### dl요소

dl 정의형(사전형)의 목록을 작성한다. 포함하는 아이템으로 dt및 dd만 포함 가능.
dt 정의형 목록의 타이틀을 뜻한다.
dd 정의형 목록의 설명
 
### 링크, 이미지, 이미지맵 

```
a(Anchor)
```

의미 : 텍스트 및 이미지에 하이퍼텍스트를 설정한다.

사용 : 인라인 요소로, 인라인 요소와 텍스트를 포함가능.

속성
- href : 하이퍼링크 주소 지정
- id, name : 앵커 식별자 지정
- title : 하이퍼링크의 보충 정보를 표시
- target : 하이퍼링크가 열릴 대상을 지정

```
img
```

의미 : 이미지를 삽입한다.

사용 : 인라인 요소이며, 빈 요소로 종료태그가 없는 요소이다.

속성 
- src : 삽입할 이미지의 파일명 혹은 url 지정
- alt(Altenatie Text) : 이미지의 대체 텍스트를 지정한다.
- width, height : 가로 / 세로의 크기 지정.

### 텍스트

```
em
```
의미 : 일반적인 강조의 의미를 갖는다.

사용 : 특정 텍스트를 강조하는 인라인 요소이다. 이탤릭 스타일

```
strong
```

의미 : 강한 강조의 의미를 갖는다.

사용 : 특정 텍스트의 강조 인라인 요소.

### 폼

```
form
```
의미 : 폼의 최상위 요소로 폼을 구성
- action : 폼을 전송할 URL 지정
- method : get, post

```
fieldset, legend
```

의미 : 여러 폼 컨트롤을 폼 안에서 그룹화 하는 요소

주요 속성
- fieldset요소로 그룹화 하는 범위를 정의 한 후 legend 요소로 그룹화한 범위의 제목을 표시
- legend 요소는 fieldset요소 바로 뒤에 한번만 사용가능.

```
label
```

의미 : 폼 컨트롤에 레이블을 정의하는 요소
사용
- label 요소에 특정 텍스트를 레이블로 정의, 동기화가 가능하다.
- 명시적 레이블 부여
   - label 요소의 for 속성에 해당 id 속성과 같은 값을 지정.
   - 하나의 컨트롤에 복수의 레이블 지정가능.
   - label 요소와 컨트롤은 인접할 필요 X.

```html
   <label for="male">남자</label> <input type="radio" name="sex" id="male" value="m">
   <label for="female">여자</label> <input type="radio" name="sex" id="female" value="f">
```
- 암시적 레이블 부여
   - label 요소의 범위에 텍스트와 컨트롤을 포함.
   - 하나의 컨트롤에 복수의 레이블 지정 불가.
   - 텍스트와 컨트롤은 반드시 label요소에 포함되어야 한다.
```html
   <label>남자 <input type="radio" name="sex" id="male" value="m"></label>
   <label>여자 <input type="radio" name="sex" id="female" value="f"></label>
```

```
input
```
의미 : 인라인 요소이며 빈요소로, 폼 안에 기본적은 컨트롤 생성.

- type 속성
  - text : 일반 텍스트 입력필드
  - password 
    - 비밀번호 입력
    - 텍스트를 마스킹 (*, ●) 한다.
    - 일반 텍스트로 전송됨
   - checkbox : 복수 선택 가능한 체크박스
   - radio : 한개만 선택 가능한 라디오버튼
   - submit : 폼 송신 버튼
   - reset : 폼 리셋
   - button : 범용 버튼
   - image : 송신 이미지 버튼 (src와 alt를 지정해야 함)
   - file : 송신파일 선택 필드
   - hidden : 화면에는 안보이지만 전송됨
- 속성
  - name : 해당 컨트롤의 이름 (객체의 키에 해당)
  - checked : 초기 선택상태를 지정
  - disabled : 해당 컨트롤을 포커스, 선택, 변경 조작 불가, 서버로 전송 X
  - readonly : 변경 불가, 서버로 전송 O

```
select
```
의미 : 셀렉트 메뉴 전체를 정의하는 요소

주요속성
- name : 셀렉트메뉴의 이름 지정
- size : 표시 줄 수 지정을 하고 목록을 박스로 표시 (넘어가면 자동으로 스크롤바 표시)

```
option
```
의미 : 셀렉트 메뉴의 항목을 정의하는 요소 select에는 option이 적어도 한개는 있어야 한다.

주요속성
- selected : 해당 항목이 선택된 상태 (없으면 첫번째 option이 선택)

```
textarea
```
의미 : 여러 줄로 된 텍스트 필드를 생성하는 인라인 요소

속성
- name, disabled, readony : 동일
- rows : 표시 줄수를 지정 (보여지는 줄의 수)
- cols : 표시 폭을 문자수로 지정

```
button
```
의미 : 버튼을 생성하는 인라인 요소

기능적으로는 input요소로 생성하는 버튼과 같지만, 이미지나 텍스트를 포함할 수 있어 디자인이 편함.

속성
- submit : 송신버튼
- reset : 리셋버튼
- button : 범용버튼