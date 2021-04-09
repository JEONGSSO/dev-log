      git rebase -p -i <수정하고 싶은 직전 커밋의 hash값 앞 7자리>

      <수정하고 싶은 직전 커밋의 hash값 앞 7자리>는 git reflow로 쉽게 찾기 가능

      git rebase -p -i HEAD~[N] ex) 지금 헤드는 HEAD~0 이다. (HEAD~ 은 HEAD~1과 동일) HEAD~2 .... HEAD~[N]
      rebase에서 직전커밋을 사용하고자 하니

      git rebase -p -i  HEAD~ 이렇게 작성

편집 창이 뜨면

      pick <수정하고자 하는 커밋내용>

-->

      edit 또는 e <수정하고자 하는 커밋내용>

이렇게 수정하고 저장 후 나가기

      git commit --amend --author="jeongsso \<rpsha33@naver.com>"

<!-- git commit --amend --author="jeongsso <rpsha33@naver.com>" -->

edit을 붙인 내역이 여러개거나 수정할 사항이 없다면

      git rebase --continue

      git push origin +<master>

\+ 붙여서 강제 푸쉬

https://jojoldu.tistory.com/120
