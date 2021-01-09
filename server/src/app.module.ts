import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./modules/auth/users.entity"

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: 'I0O15FzjcX',
      password: 'HMMu5XTRtp',
      database: 'I0O15FzjcX',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
