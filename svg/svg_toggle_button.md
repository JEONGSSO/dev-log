```html
<!-- Vue -->
   ...
   <button class="ttt" :class="{ dark: active }" @click="toggle">
      <svg width="30" height="30" class="tttt">
         <circle cx="15" cy="15" r="7" fill="white"></circle>
      </svg>
   </button>
   ...
```

```js

...
   data() {
      return {
         active: false,
      }
   },
   methods: {
      toggle() {
         this.active = !this.active
      },
   },
    ...

```

```css

.ttt {
    display:flex;
    position:relative;
    top:15px;
    left:15px;
    width:50px;
    height:10px;
    padding:10px;
    border-radius:5px;
    align-items:center;
    background-color:#7c7f87;
  }

  .ttt.dark {
    background-color:#69a754;
  }

  .ttt .tttt {
    position:absolute;
    transition:left .4s;
  }

  .ttt .tttt {
    left: -5px;
    opacity:.5;
  }

  .ttt.dark .tttt {
    left: 25px;
    opacity: 1;
  }

```