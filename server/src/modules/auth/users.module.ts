import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import {User} from './users.entity'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import {MysqlHelper} from '../../helpers/mysql'

@Module({
    imports: [
        // TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'TOKEN_KEY',
            signOptions: { expiresIn: '24h' },
          }),
    ],
    // exports: [TypeOrmModule],
    providers: [UsersService, JwtStrategy, MysqlHelper],
    controllers: [UsersController],
})
export class UsersModule {}