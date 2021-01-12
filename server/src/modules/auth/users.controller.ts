import {
    Body,
    Controller,
    Post,
    Get,
    ValidationPipe,
    UseGuards,
    Request
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken'
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
  
 
  @Controller('auth')
  export class UsersController {
      
    constructor(
        private authService: UsersService,
        private jwtService: JwtService
    ) {}
  
    @Post('/signup')
    async signUp(
      @Body(ValidationPipe) authData: any,
    ): Promise<any> {
       const user = await this.authService.signUp(authData);
       const token = this.jwtService.sign({...user})
        return user ? {token} : {error: true, message: "user not found"}
    }
  
    @Post('/login')
    async login(
      @Body(ValidationPipe) loginData: {email: string, password: string},
    ): Promise<any> {
        const user = await this.authService.findByName(loginData);
        console.log('user', user)
        const token = this.jwtService.sign({...user})
        return user ? {token} : {error: true, message: "user not found"}
    }
  
    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    getUser(
        @Request() req
    ) {
        return req.user;
    }
  
  }
  