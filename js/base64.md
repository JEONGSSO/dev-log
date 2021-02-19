https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings

post에 태그를 넘기면 naxsi이슈가 있어 base64로 인코딩 한 뒤에 보내려고 시도했다.
**한글을 포함한 지원안되는 문자열들을** 우회하기 위해서 urlencode를 사용하여 인코딩을 두번하고 받는쪽에서 디코딩을 두번해서 처리했다

그냥 urlencode를 사용해서 처리할 수 있는지 확인해야 함.
