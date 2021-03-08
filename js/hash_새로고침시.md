```js
const hash = (window.location.hash || "").replace(/^#/, "");
if (hash && hash.length > 0) {
  if (!confirm("메시지")) {
    window.location.replace(url);
    return false;
  }
}
```
