# git tag 알아보기

## 태그: 커밋을 참조하기 쉽도록 알기 쉬운 이름을 붙이는 것을 말합니다.

**브랜치와의 차이는 한 번 붙인 태그는 브랜치처럼 위치가 이동하지 않고
고정된다.**

```
// 선요약
tag 작성 : git tag -a {tag id} -m "{tag message}"
tag 확인 : git tag
tag push : git push {Remote Address} {tag id}
commit log에서 tag 확인 : git log --decorate
tag 삭제 : git tag -d {tag id} OR git tag --delete {tag id}
```

```bash
// 내가 입력한 tag
git tag -a test -m "teg test"

// test tag가 있는것을 확인할 수 있다.
git tag

// 커밋 내역, 태깅 로그 확인 가능.
git log 
commit ~~ (HEAD -> master, tag: test, origin/master, origin/HEAD)

// 로컬에만 저장된 태그를 repo로 푸쉬.
git push origin test
 
```

tag의 장점은 checkout할 경우 tag id로도 가능하다는 것입니다.

```bash
git checkout test
```
test tag로 체크아웃!

출처 : https://mr-dan.tistory.com/48
https://backlog.com/git-tutorial/kr/stepup/stepup4_1.html