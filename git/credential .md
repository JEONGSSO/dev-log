      git config credential.helper store

해당 폴더 .git 에서만 반영구적으로 재사용가능한 상태로 저장하기

      git config credential.helper 'cache --timeout=3600'

일정시간 동안 저장하기

      git config credential.helper store --global

모든 git 활동에 저장하기

https://www.hahwul.com/2018/08/22/git-credential-helper/