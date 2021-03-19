const imgs = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
  {
    albumId: 1,
    id: 3,
    title: "officia porro iure quia iusto qui ipsa ut modi",
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355",
  },
  {
    albumId: 1,
    id: 4,
    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    url: "https://via.placeholder.com/600/d32776",
    thumbnailUrl: "https://via.placeholder.com/150/d32776",
  },
  {
    albumId: 1,
    id: 5,
    title: "natus nisi omnis corporis facere molestiae rerum in",
    url: "https://via.placeholder.com/600/f66b97",
    thumbnailUrl: "https://via.placeholder.com/150/f66b97",
  },
];
const imgs2 = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/AW60a/213",
    thumbnailUrl: "https://via.placeholder.com/150/771791",
  },
  {
    albumId: 1,
    id: 3,
    title: "officia porro iure quia iusto qui ipsa ut modi",
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355",
  },
  {
    albumId: 1,
    id: 4,
    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    url: "https://via.placeholder.com/600/d32776",
    thumbnailUrl: "https://via.placeholder.com/150/d32776",
  },
  {
    albumId: 1,
    id: 5,
    title: "natus nisi omnis corporis facere molestiae rerum in",
    url: "https://via.placeholder.com/600/f66b97",
    thumbnailUrl: "https://via.placeholder.com/150/f66b97",
  },
];

function* map(f, iter) {
  for (const a of iter) {
    yield a instanceof Promise ? a.then(f) : f(a);
  }
}

const reduceAsync = async (f, iter, acc) => {
  for await (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    // console.log("이미지 로드", url);
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
    return url;
  });

const f = async (imgs) =>
  await reduceAsync(
    (a, b) => a + b,
    map(
      (img) => img.height,
      map(({ url }) => loadImage(url), imgs)
    ),
    0
  );
f(imgs)
  .catch((_) => 0)
  .then(console.log);
f(imgs2)
  .catch((_) => 0)
  .then(console.log);
