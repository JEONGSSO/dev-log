```js

function listToString(data) {
   return (
      '<li class="item">\
            <div>\
               <span class="name">' + data.name + ' (' + data.cnt + '/' + data.maxCnt + ') </span>\
               <span class="arrow"></span>\
               '+(
                  _.join(_.range(5).map(function(val) {
                        var isCheck = data.maxCnt > val
                        return '<span class="cnt ' + _.join(isCheck ? 'check' : '', '') + '" ></span>'
                  }), '')
               )+'\
               <span class=""></span>\
            </div>\
            <button class="btn used">' + data.status + '</button>\
      </li>')
}

$('.list').append(
   e.totalCount && e.data
   ? e.data.reduce(function(acc, val) {
      return acc.concat(listToString(val));
   }, '')  
   : '<li class="empty_list">목록이 없습니다.</li>'
);


// 요런식으로 String들을 concat해 이어붙이고 append를 한번 처리하면 성능 업
```