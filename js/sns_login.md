SNS 로그인 적용

OAuth는 외부서비스의 인증 및 권한 부여를 관리하는 프로토콜

![OAuth 인증](https://media.vlpt.us/images/sa833591/post/d36d9916-11ff-48f1-ae7e-2305a2b6363d/kakaologin_process.jpg)

참고 https://tansfil.tistory.com/60

https://velog.io/@sa833591
소셜 로그인(카카오,네이버, ...)

SNS 로그인은 OAuth 2.0 + 서버인증 으로 구성된다

![네이버 아이디 로그인 docs]https://developers.naver.com/docs/login/overview/


php 버전

```php

네이버 로그인 접근토큰 획득 예제는 2개의 파일로 구성되어 있습니다. (naverlogin.php, callback.php)
1. naverlogin.php
<?php
  // 네이버 로그인 접근토큰 요청 예제
  $client_id = "YOUR_CLIENT_ID";
  $redirectURI = urlencode("YOUR_CALLBACK_URL");
  $state = "RAMDOM_STATE";
  $apiURL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=".$client_id."&redirect_uri=".$redirectURI."&state=".$state;
?><a href="<?php echo $apiURL ?>"><img height="50" src="http://static.nid.naver.com/oauth/small_g_in.PNG"/></a>

2. callback.php
<?php
  // 네이버 로그인 콜백 예제
  $client_id = "YOUR_CLIENT_ID";
  $client_secret = "YOUR_CLIENT_SECRET";
  $code = $_GET["code"];;
  $state = $_GET["state"];;
  $redirectURI = urlencode("YOUR_CALLBACK_URL");
  $url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=".$client_id."&client_secret=".$client_secret."&redirect_uri=".$redirectURI."&code=".$code."&state=".$state;
  $is_post = false;
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, $is_post);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $headers = array();
  $response = curl_exec ($ch);
  $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  echo "status_code:".$status_code."
";
  curl_close ($ch);
  if($status_code == 200) {
    echo $response;
  } else {
    echo "Error 내용:".$response;
  }
?>

```

node + js 버전 추가 예정