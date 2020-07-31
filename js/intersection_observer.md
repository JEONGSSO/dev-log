최근 비디오를 넣어 가이드를 만드는 작업을 했는데

비디오가 세개 있다 치면 

페이지가 로딩 될 때 전부 다 로딩이 되지않게 하고 그 비디오가 보여질때 로딩하게 처리를 하여
리소스를 줄이고자 정리


```js

function lazyVideoLoader() {
  var options = {threshold: .1};
  var callback = function (entries, observer) {
    var videoSrc = {
      'two': {
        m: "src"
        pc: "src"
      },
      'gold_out': {
        m: "src"
        pc: "src"
      }
    };

    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        var targetClassName = entry.target.classList[2];
        $('.video_contents.lazy.' + targetClassName).prepend(`
          <source src="${videoSrc[targetClassName][is_mobile || 'pc']}" type="video/mp4">
        `)
      }
    });
  };
  var observer = new IntersectionObserver(callback, options);

  // 한 가지의 lazy Element가 아니라서 querySelectAll로 가져 온 후
  var lazyLoadingEl = document.querySelectorAll('.lazy');
  
  // Array.from은 nodeList(유사배열)을 Array.prototype 메소드를 사용가능하게 만들어준다. forEach로 각각 넣어주었다
  Array.from(lazyLoadingEl).forEach( function (el) {return observer.observe(el)});

}

```