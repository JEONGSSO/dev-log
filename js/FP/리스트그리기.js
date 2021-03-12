const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = curry((selector, parent = document) => parent.querySelectorAll(selector));

const fetchData = curry((methods, url) => window.fetch(url).then((data) => data.json()));


const listElem = qs('#list');
const items = qsa('.item');

const removeList = (list) => list.length && list.forEach(item => listElem.removeChild(item));

const makeList = (pre, list) => pre + `<li>${list.name}</li>`;
const makeListHtml = ({ data }) => reduce(makeList, data, '');
const appendHtml = curry((target, html) => target.insertAdjacentHTML('beforeend', html));

const fetchUrl = 'https://jsonplaceholder.typicode.com/todos/1';

go1(
  fetchUrl,
  tap( // tap 함수 받은 값은 그대로 넘기면서 받은 값으로 내부처리를 할 수 있는 함수
    _ => listElem, // 여기서 _(url)은 필요없으니 버림
    items,
    removeList // 이미 그려져 있는 리스트 삭제 
  ),
  fetchData("get"), 
  makeListHtml,
  appendHtml(listElem) // 리스트 렌더링 
);

// tap 함수 https://github.com/marpple/FxJS/blob/master/API.md#tap