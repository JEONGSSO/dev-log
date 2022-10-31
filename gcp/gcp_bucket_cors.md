gcp bucket에서 파일을 가져로려고

공개된 저장소에 추가했는데 cors가 걸렸다

리눅스에서 gsutil를 설치하고

```js
[
  {
    origin: ["https://your-example-website.appspot.com"],
    method: ["GET"],
    responseHeader: ["Content-Type"],
    maxAgeSeconds: 3600,
  },
];
```

위와 같은 설정파일을 만들고 CORS_CONFIG_FILE파일이름 gcp 버킷이름 BUCKET_NAME 추가하여 set하면 끝

```bash
  gsutil cors set <CORS_CONFIG_FILE> gs://<BUCKET_NAME>
```

## 참조

https://cloud.google.com/storage/docs/configuring-cors?hl=ko#gsutil_2
