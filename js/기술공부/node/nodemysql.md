
```js

import mysql from 'mysql'
import { promisify } from 'util'
import dbConfig from '../config/database'

/**
 * @class
 */
class DB {
    poolOptions = {}

    constructor() {
        this.dbConfig = dbConfig
        const { host, username: user, password, database } = this.dbConfig
        this.poolOptions = {
            connectionLimit: 20,
            host,
            user,
            password,
            database,
            multipleStatements: true // 다중 쿼리 취약점이 있을 수 있다.
        }
        this.poolConnection = mysql.createPool(this.poolOptions)
    }

    /**
     * @return {Object} mysql Connection
     */
    connection = () => {
        return mysql.createConnection(this.dbConfig)
    }

    /**
     * @return {Object} mysql Connection
     */
    pool = () => {
        return this.poolConnection
    }

    /**
     * @param {string} sql
     * @return {*} result
     */
    query = async (sql, params = []) => { 
        const pool = this.poolConnection
        const err = !sql && 'Invalid params'

        if (err) {
            throw err
        }

        let result, conn

        try {
            const getConnection = promisify(pool.getConnection).bind(pool)
            conn = await getConnection()
            const connQuery = promisify(conn.query).bind(conn)

            result = await connQuery(sql, params)
        } catch (e) {
            throw Error(e)
        } finally {
            conn.release() // 연결을 끊어주지 않으면 연결 수 초과로 인한 pending으로 타임아웃까지 동작을 멈춘다.
        }

        return result
    }

   // 이건 안되더라;
    transaction = async (process) => {
        const pool = this.poolConnection

        let result, conn

        try {
            const getConnection = promisify(pool.getConnection).bind(pool)
            conn = await getConnection()
            result = promisify(conn[process]).bind(pool)
        } catch (e) {
            throw Error(e)
        } finally {
            conn.release()
        }
        return result
    }
}

export default new DB()

```

node utils에 promisify로 감싼 리턴 값을 사용해주면 따로 구현하지 않아도 promise를 사용할 수 있다.

여기서는 pool을 바인딩 해주는 모습

트랜잭션도 사용하려는 곳에서 바인딩을 통해 처리를 해주면된다.
단, release는 promisify 해주지 않아도 된다

```js
   const getConnection = promisify(pool().getConnection).bind(pool())
   const conn = await getConnection()

   const beginTransaction = promisify(conn.beginTransaction).bind(pool())
   const commit = promisify(conn.commit).bind(pool())
   const rollback = promisify(conn.rollback).bind(pool())

   conn.release() //릴리즈 db 연결을 끊어줌

   ```

## 트랜잭션 Lock

Lock wait timeout exceeded; try restarting transaction

트랜잭션이 묶여서 진행이 안되는 상태인데

서버를 다시시작 하거나, 해당 트랜잭션 id를 kill해주면 된다.

https://www.popit.kr/mysql-lock-%EC%83%81%ED%99%A9-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0/