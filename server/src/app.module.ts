import { Module } from '@nestjs/common';
import { UsersModule } from './modules/auth/users.module';
import { FriendsModule } from './modules/friends/friends.module';
import {PassportModule} from '@nestjs/passport';

@Module({
  imports: [   
    UsersModule,
    FriendsModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
  ],
})
export class AppModule {}
