wsl 에서 간헐적으로 git 오염이 될 때

```bash

error: object file .git/objects/79/cbddeb3c2e2e6cb41f301bdf1e10c0508066e3 is empty
error: object file .git/objects/79/cbddeb3c2e2e6cb41f301bdf1e10c0508066e3 is empty
fatal: loose object 79cbddeb3c2e2e6cb41f301bdf1e10c0508066e3 (stored in .git/objects/79/cbddeb3c2e2e6cb41f301bdf1e10c0508066e3) is corrupt

```

git version을 최신 버전으로 업데이트 하고

```bash

find .git/objects/ -type f -empty | xargs rm
git fetch -p
git fsck --full

```

https://davemateer.com/2021/01/29/git-corruption-with-wsl2

https://stackoverflow.com/questions/11706215/how-to-fix-git-error-object-file-is-empty/31110176#31110176

다른 유저에게서 다시 오픈된듯 하다. 작성 21-04-13 기준
https://github.com/microsoft/WSL/issues/5895
