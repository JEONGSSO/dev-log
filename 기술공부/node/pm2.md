Project Manager의 약자  
노드 프로세스를 관리해주는 역할을 한다.

app에서 남기는 로그 처리, 프로세스가 죽었을때 (restart 등), 부팅시 실행 등등 많은 역할을 수행해줄 수 있다.

```
    npm i - g pm2
```

---

```
pm2 list // 리스트 id, name등등 표시
pm2 start // 실행
pm2 stop [id, name ...] // 스톱

pm2 monit // 모니터링 기능

보통 nodejs가 하나만 실행되는데 cluster 모드로 여러개의 nodejs를 실행가능

연결된 노드 app을 사용가능한 모든 CPU로 확장할 수 있다.
이는 사용하능한 CPU수에 따라 APP의 성능과 안정성을 크게 향상시킨다.

모든 CPU를 사용하기 위해서는 모드를 cluster로 실행해야 한다.


```

하지만 cluster 환경에서 node js 모듈인 socket io는 정상 작동하지 않는다  
이유는 cpu갯수 만큼 할당된 프로세스들은 소켓 정보를 공유 하지 못하기 때문에  
적상적으로 작동 될 수 없다.  
이런 부분을 해소 하기위해서 redis서버와 redis 모듈을 설치 한 후 socket 정보들을  
redis에서 공유 할 수 있도록 해주면 cluster 환경에서도 적상적인 socket io를  
사용 할 수 있다

출처: [https://hjw1456.tistory.com/1](https://hjw1456.tistory.com/1) \[끄적이는공간\]
