nuxt에서 

```json

// package.json
"@ckeditor/ckeditor5-build-classic": "^22.0.0",
"@ckeditor/ckeditor5-vue": "^1.0.2",

```

당장은 한곳에서만 사용할 ckeditor를 build 번들할때 170kb가량을 먹고있어서 (불필요 크기 증가)

ckeditor 사용하는 파일에서만 js파일을 받을 수 있도록 수정하였다.

사용하는 vue 파일

```js
// nuxt 로컬 설정

<script>

let ClassicEditor, CKEditor
  if (process.client && window) {
    CKEditor = window.CKEditor
    ClassicEditor = window.ClassicEditor
  } else {
    CKEditor = { component : {template:'<div></div>'}}
  }

export default {
   head: {
         script: [
            {
               src: "https://cdn.ckeditor.com/ckeditor5/23.1.0/classic/ckeditor.js"
            },
            {
               src: "https://cdn.jsdelivr.net/npm/@ckeditor/ckeditor5-vue@1.0.3/dist/ckeditor.min.js"
            }
         ]
      },
}
</script>
```

이런식으로 에디터에서 사용하는 곳에서만 js파일을 받아 리소스를 줄일 수 있었다.