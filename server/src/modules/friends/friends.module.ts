import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersService } from '../auth/users.service';
import {MysqlHelper} from '../../helpers/mysql'

@Module({
    imports: [
        JwtModule.register({
            secret: 'TOKEN_KEY',
            signOptions: { expiresIn: '24h' },
          }),
    ],
    providers: [FriendsService, JwtStrategy, MysqlHelper, UsersService],
    controllers: [FriendsController],
})
export class FriendsModule {}