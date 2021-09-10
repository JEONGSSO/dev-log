## corrupt zsh history 고치는 방법

https://shapeshed.com/zsh-corrupt-history-file/

```bash

cd ~

mv .zsh_history .zsh_history_bad
strings -eS .zsh_history_bad > .zsh_history #.zsh_history_bad에 있는 strings를 옮기기
fc -R .zsh_history
rm ~/.zsh_history_bad

# strings를 모른다고 하면
# https://askubuntu.com/questions/948279/how-to-install-strings-in-ubuntu-server binutils 설치

```
