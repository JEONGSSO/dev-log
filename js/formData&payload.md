콘텐츠 타입
https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Type

form data
https://developer.mozilla.org/ko/docs/Web/API/FormData

```html
<form method="post" enctype="multipart/form-data" action="url" >
   <input type="file" />
</form>
```

같은 form 의 데이터를 post로 넘기는 것

자바스크립트 new FormData() 생성자로 구현 할 수도 있는데
```js

const formData = new FormData()
formData.append('file', myFileInput.files[0])

axios.post(url, formData, {
   headers: {
      'content-type': 'multipart/form-data'
   }
})

```

formData를 넘기는 부분이 달랐다

form 태그에서 사용하는 form data는 file:(binary) 이런식으로 나오고,
자바스크립트에서 append해서 넘기면 form data는 file: base64!@#@!# 이런식으로 나왔었다
더 찾아봐야 할것

https://github.com/fengyuanchen/cropperjs
cropperjs에서 제공하는 getCroppedCanvas함수로 진행하면 form 태그와 같이 넘길 수 있따.

```js

this.cropper.getCroppedCanvas({width:300, height:300}).toBlob(async blob => {
   const formData = new FormData()
   formData.append('file', blob);
   ... 
})

```

request payload는
post의 값으로 들어가는 것들을 말한다.

```js
const data = {
   a: 1,
   b: 2
}
axios.post(url, data)

```

파일 업로드시에 body를 이용할 수도 있고, 
formData를 이용해서 사용할 수도 있다.