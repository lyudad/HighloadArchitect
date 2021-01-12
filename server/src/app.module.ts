import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/auth/users.module';
// import {User} from "./modules/auth/users.entity"
import {PassportModule} from '@nestjs/passport';

@Module({
  imports: [   
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'remotemysql.com',
    //   port: 3306,
    //   username: 'I0O15FzjcX',
    //   password: 'HMMu5XTRtp',
    //   database: 'I0O15FzjcX',
    //   entities: [User],
    //   synchronize: true,
    // }),
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
})
export class AppModule {}
