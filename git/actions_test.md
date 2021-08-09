## 깃허브 액션 간단설명

```bash

# actions에서 이름을 정의
name: CI

on:
  push:
    branches: [ main, develop ] # main 및 develop 브랜치에 푸쉬되면 워크플로우가 실행됨
  pull_request:
    branches: [ main ]

  # 이곳애 수동으로 시작할 워크플로우를 만들 수 있다.
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Run a one-line script
        run: echo Hello, world!

      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.

```

run a one line script와 multi line script가 찍히는것을 확인 할 수 있다.

수동으로 workflow dispatch하기

```bash

name: test
on:
  workflow_dispatch:
    inputs:
      name: # github.event.inputs.name 출력
        description: "hong copy"
        required: true
        default: "Mona the Octocat"
      home:
        description: "location"
        required: false
        default: "The Octoverse"

jobs:
  say_hello:
    runs-on: ubuntu-latest
    steps:
      - run: |
          echo "Hello ${{ github.event.inputs.name }}!" # 수동으로 실행할 때의 inputs name이 출력됨
          echo "- in ${{ github.event.inputs.home }}!" # 수동으로 실행할 때의 inputs home이 출력됨

```
