# SCSS

기존 css에선 할 수 없었던 변수, 반복문, 조건문, 함수화 등등의 기능을 사용할 수 있는 것.

하지만, 웹은 css만 읽을 수 있으므로 전처리기를 통한 컴파일이 필요한데,
node-sass, SassMeister, parcel, gulp 등등 많은 도구들이 있지만
나는 webpack scss-loader를 사용한다.

## 기본문법
```scss
기존 css
#root .container .wrapper.on {css}

scss
#root {
   .container {
      .wrapper {
         &.on{
         css
         }
      }
   }
}

위의 css와 scss는 완전히 같은 역할은 한다.

프로그래밍하듯이 블록으로 감싸서 선택자를 넣어줄 수 있다.
```

## 변수 사용
```scss

//변수는 블록 스코프를 가진다.
$mouse_hover_color: #fff7f7;
$actvie_color: #fff;

단, !global
ex) $actvie_color !global; 을 사용하면 전역에서 사용가능하게 된다.

#root {color: $active_color} // $active_color 변수 사용
```

## {} 문자 보간

```scss
//``(백틱)처럼 
// #{$family}를 사용해 문자열안에 변수 값을 넣을 수 있따.

$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=#{$family}");

```

## 믹스인
```scss
//btn 커스텀 믹스인
@mixin custom-btn ($w, $h, $backc:#0366d6, $color:#fff){ //js처럼 기본값을 넣어줄 수 있다.

   display: inline-block;
   text-align: center;
   width: $w;
   height: $h;
   background-color: $backc;
   line-height: $h;
   box-sizing: border-box;
   color: $color;
   border-radius: 3px;
   font-weight: 600;

   @if $color != #fff{ //조건문
      border: solid 1px #d0d0d0;
   } @else {
      border: solid 1px #0366d6;
   }
}

@mixin custom-btn 믹스인을 사용하려면

@include custom-btn(~~매개변수~~);
```

## 함수 
```scss
   @function 함수이름 ($매개변수) {
      @return 리턴값;
   }

   믹스인과 다른점은 스타일을 반환하지만

   함수는 값을 반환한다.

   @function custom-color ($custom-color) {
      @return $custom-color;
   }

   #root {
      color: custom-color(#fff); // 함수 사용
   }

   사용방법도 믹스인은 @include를 사용해야 하지만,

   함수는 함수명 그대로 사용할 수 있따.

```

## 반복문 

```scss
scss 반복문은 through형식과 to형식이 있다.

//종료 만큼 반복 ex) 시작 1 종료 3이면 3번을 반복.
@for $변수 from 시작 through 종료 {
   
}

@for $i from 1 through 3 {
   .through:nth-child(#{$i}) {
    width : 20px * $i
  }
}

//종료 직전까지 반복 ex) 시작 1 종료 3이면 2번을 반복.
@for $변수 from 시작 to 종료 {

}

@for $i from 1 to 3 {
  .to:nth-child(#{$i}) {
    width : 20px * $i
  }
}

.through:nth-child(1) { width: 20px; }
.through:nth-child(2) { width: 40px; }
.through:nth-child(3) { width: 60px; }

.to:nth-child(1) { width: 20px; }
.to:nth-child(2) { width: 40px; }

```

가장 기초적인 부분만 살펴보았는데 더 많은 정보가 필요하다면

출처 : https://heropy.blog/2018/01/31/sass/