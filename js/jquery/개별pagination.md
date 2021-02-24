```js

e.data.forEach(function (v){ return v.currentPage = 1})

$('.arrow').click(function () { //왼쪽 오른쪽 버튼 클릭
   var clickSelf = $(this);
   var data = e.data[clickSelf.closest('.item').data('list_idx')]; // li리스트 인덱스로 data 찾기
   var totalPage = data.maxAmount / 5;
   if ( !clickSelf.hasClass('inactive') ) {
      clickSelf.siblings('.cnt').removeClass('check')
      data.currentPage = clickSelf[0].className.indexOf('right') > -1 ? data.currentPage + 1 === data.maxAmount ? data.maxAmount : data.currentPage + 1 : data.currentPage - 1 === 0 ? 1 : data.currentPage + -1
      var currentCheck = data.currentPage > totalPage - 1 ? data.CheckAmount % 5 === 0 ? 5 : data.CheckAmount % 5 : 5;
      _.range(currentCheck).forEach(function (index) {
            clickSelf.siblings('.cnt')[index].className += ' check'
      })
      if (data.currentPage === totalPage || data.currentPage === 1) {
            clickSelf.toggleClass('inactive')
      }
      clickSelf.siblings('.inactive').removeClass('inactive')
   }
});

```