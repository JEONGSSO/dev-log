``` js

import Vue from 'vue'

let handleClickOutside

Vue.directive('click-outside', {
   bind (el, binding, vnode) {
      handleClickOutside = (e) => {
         e.stopPropagation()
         const { handler, exclude } = binding.value
         let clickedOnExcludedEl = false

         // Gives you the ability to exclude certain elements if you want, pass as array of strings to exclude
         if (exclude) {
            exclude.forEach(refName => {
               if (!clickedOnExcludedEl) {
                  const excludedEl = vnode.context.$refs[refName]
                  clickedOnExcludedEl = excludedEl.contains(e.target)
               }
            })
         }

         if (!el.contains(e.target) && !clickedOnExcludedEl) {
            handler(e)
            }
      }
         document.addEventListener('click', handleClickOutside)
         document.addEventListener('touchstart', handleClickOutside)
      },
   unbind () {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
   }
})
// https://tahazsh.com/detect-outside-click-in-vue 
```

```html

<!-- template using -->
<div v-click-outside></div>

```

**다른 버전**
https://dev.to/jamus/clicking-outside-the-box-making-your-vue-app-aware-of-events-outside-its-world-53nh

```html

...
<div class="wrap" :class="{ selected: show }" v-click-outside="outsideClickBinder">
   <button @click="toggle">toggle</button>
   <ChildContents />
</div>


```

```js

data() {
   return {
      show: false,
   }
},
methods: {
   toggle() {
      this.show = !this.show;
   },
   outsideClickBinder() {
      this.$root.$emit('outsideClickBinder'); // directive에 v-click-outside를 선언한 el와 DirectiveBinding이 넘어감
      if (this.show) {
         this.show = false;
         document.removeEventListener('click', this.$el.__vueClickHandler__); // 밑 el에 할당된 리스너로 이벤트 제거
      }
   }
}


```

```js
// import Vue

Vue.directive('click-outside', {
   bind(el, bind) { // el, bind class wrap의 정보
      const ourClickEvnetHandler = evt => {
      if (!el.contains(evt.target) && el !== evt.target) {
         bind.value(evt);
         }
      };
      // 나중에 remove를 위해 el에 할당 
      el.__vueClickHandler__ = ourClickEvnetHandler;

      document.addEventListener('click', ourClickEvnetHandler);
   },
   unbind(el) {
      document.removeEventListener('click', el.__vueClickHandler__);
   }
})

```
