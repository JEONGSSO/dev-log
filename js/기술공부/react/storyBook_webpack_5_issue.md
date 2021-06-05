## 요약

스토리북 알파 버전인 6.3.0을 받아야 하고 dotenv-webpack를 받아야 함

```
npx sb@next upgrade --prerelease

npm i -D dotenv-webpack @storybook-builder-webpack5@next
```

.storybook/main.js

```js
module.exports = {
  ...
  core: {
    builder: "webpack5",
  },
  ...
};
```

https://github.com/storybookjs/storybook/issues/14497

https://gist.github.com/shilman/8856ea1786dcd247139b47b270912324

https://stackoverflow.com/questions/67070802/webpack-5-and-storybook-6-integration-throws-an-error-in-defineplugin-js/67074945#67074945
