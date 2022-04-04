# https://ko.wikipedia.org/wiki/Gzip

gzip은 GNU zip의 준말이며, 초기 유닉스 시스템에 쓰이던 압축 프로그램을 대체하기 위한 자유 소프트웨어이다.

gzip은 Jean-loup Gailly와 마크 애들러가 만들었다. 버전 0.1은 1992년 10월 31일에 처음 공개되었으며, 버전 1.0이 1993년 2월에 뒤따라 나왔다.

오픈BSD의 gzip 버전은 더 오래된 압축 프로그램을 기반으로 하고 있으며, 오픈BSD 3.4에 추가되었다.

```bash
    gzip on;
    gzip_min_length 1k; #1k 미만의 파일은 압축 하지 않음
    gzip_comp_level 6; # 압축레벨 1 ~ 9까지 있음 숫자가 높을 수록 압축률이 더 높지만 시간이 더 걸림
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml; # 압축할 파일
    gzip_vary on; # gzip가 설정되어 있을 때, 응답 헤더에 Vary Accept-Encoding 추가 여부
```

## nginx

---

## gzip config http://nginx.org/en/docs/http/ngx_http_gzip_module.html#directives
