import * as mysql  from 'mysql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MysqlHelper {
    private connection;
    constructor(){
        this.connectDb();
    }

    public connectDb() {
        this.connection  = mysql.createConnection({
            // host: 'remotemysql.com',
            // port: 3306,
            // user: 'I0O15FzjcX',
            // password: 'HMMu5XTRtp',
            // database: 'I0O15FzjcX',
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'Dl1988555$',
            database: 'I0O15FzjcX',
        });
        this.connection.on('error', (err) => {
            console.log('err connection', err)
            this.connectDb()
        }); // probably worth adding timeout / throttle / etc
      }

    public query<T>(query: string, params: T[] | [] = [], isOne?: boolean){
        return new Promise((resolve, reject) => {
            this.connection.query(query, params, function (error, results) {
                if (error) reject(error);
                if(isOne){
                    resolve(results[0])
                } else {
                    resolve(results)
                }
                
            })
        });
    }
}