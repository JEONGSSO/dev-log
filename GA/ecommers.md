구매 

```js

gtag('event', 'purchase', {
  "transaction_id": "24",
  "affiliation": "item",
  "value": 10000 // price * count
  "currency": "WON",
  "items": [
    {
        "id": "8" // item.id 일단 임의로 정함,
          "name": "item100",
          "category": "item1",
          "list_position": 1, // 제품 목록 위치/순서 보통 숫자로 표시
          "quantity": 1,
          "price": '100000'
    }
  ]
});

```

전체환불 

```js
gtag('event', 'refund', { "transaction_id": "T12345" })
```

부분환불

```js
gtag('event', 'refund', {
  "transaction_id": "24",
  "affiliation": "item",
  "value": 100000, // price * count
  "currency": "WON",
  "items": [
    {
        "id": "8" // item.id 일단 임의로 정함,
          "name": "item100",
          "category": "item1",
          "list_position": 1, // 제품 목록 위치/순서 보통 숫자로 표시
          "quantity": 1,
          "price": '100000'
    }
  ]
});
```