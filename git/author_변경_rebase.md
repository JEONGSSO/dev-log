      git rebase -p -i <수정하고 싶은 직전 커밋의 hash값 앞 7자리>

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
