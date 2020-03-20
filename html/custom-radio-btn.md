```html
<label class="state_type label" for="state">
  <label for="all" class="radio-check-btn">
    <input
      id="all"
      type="radio"
      name="state-label"
      class="radio-label"
      checked
    />
    <span class="radio-after"></span> <span class="radio-item">전체</span>
  </label>
  <label for="wait" class="radio-check-btn">
    <input id="wait" type="radio" name="state-label" class="radio-label" />
    <span class="radio-after"></span><span class="radio-item">대기</span>
  </label>
  <label for="playing" class="radio-check-btn">
    <input id="playing" type="radio" name="state-label" class="radio-label" />
    <span class="radio-after"></span><span class="radio-item">진행</span>
  </label>
</label>
```

```css
.content input[type='radio'] {
  display: none;
}

.content .radio-label {
  width: 21px;
  height: 21px;
  background-color: #fff;
  z-index: 1;
}

.content .radio-after {
  position: relative;
  top: 0;
  left: 0;
  height: 17px;
  width: 17px;
  border: #ededed 2px solid;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

.content .radio-item {
  position: relative;
  bottom: 6px;
  margin-left: 10px;
  margin-right: 20px;
}

.content .radio-label:checked ~ .radio-after {
  border: #df4646 2px solid;
}

.content .radio-after::after {
  top: 2px;
  left: 2px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: #df4646;
}

.content .radio-after::after {
  content: '';
  position: absolute;
  display: none;
}

.content .radio-label:checked ~ .radio-after::after {
  display: block;
}

.content .radio-check-btn {
  position: relative;
  top: 5px;
}
```
