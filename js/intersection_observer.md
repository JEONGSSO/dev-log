최근 비디오를 넣어 가이드를 만드는 작업을 했는데

비디오가 세개 있다 치면 

페이지가 로딩 될 때 전부 다 로딩이 되지않게 하고 그 비디오가 보여질때 로딩하게 처리를 하여
리소스를 줄이고자 정리

참초 https://heropy.blog/2019/10/27/intersection-observer/

```js

function lazyVideoLoader() {
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

  var renderVideo = function (className) {
    var lazyContent = document.querySelectorAll('.video_contents.lazy.' + className);
    var item = document.createElement('source');
    item.src = videoSrc[className][is_mobile || 'pc'];
    item.type = "video/mp4";
    lazyContent[0].appendChild(item);
  };

  var options = {threshold: .1}; // threshold .1 해당 엘리먼트가 몇 퍼센트 보여야 하는지 옵션 지정 지금은 10%
        // 옵션은 threshold 말고도 rootMargin, root가 있다.
  var callback = function (entries, observer) {
    entries.forEach(function (entry) {

      // entry.isIntersecting option에 따른 boolean 값으로 option 만큼 보이면 true 생성됨 
      if (entry.isIntersecting) {

        //해당 엘리먼트가 보이면 unobserve로 그만 지켜보게 함
        observer.unobserve(entry.target);

        var targetClassName = entry.target.classList[2];
        renderVideo(targetClassName);
      }
    });
  };
  var observer = new IntersectionObserver(callback, options);

  // 한 가지의 lazy Element가 아니라서 querySelectAll로 가져 온 후
  var lazyLoadingEl = document.querySelectorAll('.lazy');
  
  // Array.from은 nodeList(유사배열)을 Array.prototype 메소드를 사용가능하게 만들어준다. forEach로 각각 넣어주었다
  Array.from(lazyLoadingEl).forEach( function (el) {return observer.observe(el)});
  //Array.from은 ie지원하지 않는다;

}
```

InterSectionObserver polyfill적용 하면서

https://github.com/w3c/IntersectionObserver/tree/master/polyfill
ie는 window에 InterSectionObserver 메소드가 없어서
만들어주는 원리이다.