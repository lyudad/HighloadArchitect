import * as mysql  from 'mysql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MysqlHelper {
    private connection;
    constructor(){
        this.connection = mysql.createConnection({
            host: 'remotemysql.com',
            port: 3306,
            user: 'I0O15FzjcX',
            password: 'HMMu5XTRtp',
            database: 'I0O15FzjcX',
        });
        
        this.connection.connect();
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