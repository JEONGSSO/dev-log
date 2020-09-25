```html
<div class="item" :class="[passwd ? validPassWd ? 'valid' : 'invalid' : '']">
   <div class="title"><label>비밀번호</label></div>
   <input type="password" id="signup_password" :value="passwd" @input="checkPasswd" name="passwd" autocomplete="off" tabindex="2" title="비밀번호" placeholder="8~16자 영문, 숫자, 특수문자를 입력하세요" class="inputbox"/>
   <span class="error_msg" v-show="validData['passwd']['error']">{{validData['passwd']['error']}}</span>
</div>
```

```js

...

data() {
   return {
      password: '',
      validData: {
         passwd: {
          title: '패스워드',
          error: '',
          valid: false,
          tip: '8~16자 영문, 숫자, 특수문자를 조합하세요'
        },
      }
   }
},
methods: {
   verifyValue(type, value) {
      const inputTypeRegExp = {
        'passwd': /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
      }
      return inputTypeRegExp[type].test(value)
    },
    errorBinder(name, valid, msg) {
      const target = this.validData[name]
      target['valid'] = valid
      target['error'] = msg
    },
   checkPasswd({ target: { name, value } }) {
      //한글을 실시간(?) 검증하려면 input에 :value로 값을 연결하고 @input으로 값을 넣어주면 된다
      //
      this[name] = value

      // 폼 검증, get 체크 값에 따라 span error_msg 표시 함수
      this.errorBinder(name, false, validData[name]['tip'])
   }
}

created() {
   this.checkPasswd = this._.debounce(this.checkPasswd, 400) // checkPasswd를 디바운스 적용 함수로 만들어 줌
},

computed: {
   validPassWd() {
         return this.verifyValue('passwd', this.passwd)
   },
}


```
매우 노가다를 해야하기 때문에
[vue 공식 홈페이지에서도 권장하는 방법으로](https://kr.vuejs.org/v2/cookbook/form-validation.html)

https://github.com/vuelidate/vuelidate

https://logaretm.github.io/vee-validate/

라이브러리를 사용하는게 정신건강에 이로울 것 같다.