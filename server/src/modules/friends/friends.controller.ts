import {
    Body,
    Controller,
    Post,
    ValidationPipe,
    UseGuards,
    Request,
    Get
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendsService } from './friends.service';
  
  @Controller('friends')
  export class FriendsController {
      
    constructor(
        private friendsService: FriendsService,
    ) {}
  
    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    async addFriend(
      @Request() req,
      @Body(ValidationPipe) {friendId},
    ): Promise<any> {
        return await this.friendsService.add(req.user.id, friendId);
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async getFriends(
      @Request() req,
    ): Promise<any> {
        return await this.friendsService.findFriends(req.user.id);
    }


  }
  