```json

...

"scripts": {
   "test": "jest --watchAll"
},
"babel": {
    "presets": [
      "@babel/preset-env"
    ]
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "vue"
    ],
    "transform": {
      ".*\\.(vue)$": "vue-jest",
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    "moduleNameMapper": {
      "^~/(.*)$": "<rootDir>/$1"
    }
  },

...

```

```js
// __tests__/test.spec.js

import { shallowMount, createLocalVue, RouterLinkStub  } from '@vue/test-utils';
import Vuex from 'vuex';

import Cmp from '~/components/componene.vue'

const localVue = createLocalVue();
localVue.use(Vuex);

const getters = {
  resources: () => 'resources'
}
const store = new Vuex.Store({ getters })

describe('shallow mount test', () => {
  const wrapper = shallowMount(Cmp, {
    localVue,
    store,
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  })
  it('1 + 1 테스트', function() {
    expect(1+1).toBe(2)
  });
})


```


