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

```

```html

<!-- template using -->
<div v-click-outside></div>

```

https://tahazsh.com/detect-outside-click-in-vue 

reply