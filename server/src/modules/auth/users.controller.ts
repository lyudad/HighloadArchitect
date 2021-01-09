import {
    Body,
    Controller,
    Post,
    Get,
    ValidationPipe,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  
 
  @Controller('auth')
  export class UsersController {
    constructor(private authService: UsersService) {}
  
    @Post('/signup')
    signUp(
      @Body(ValidationPipe) authData: any,
    ): Promise<any> {
       return this.authService.signUp(authData);
    }
  
    @Post('/login')
    login(
      @Body(ValidationPipe) loginData: {email: string, password: string},
    ): Promise<any> {
       return this.authService.findByName(loginData);
    }
  
    @Get('/')
    getUser() {
      return this.authService.findAll();
    }
  
  }
  