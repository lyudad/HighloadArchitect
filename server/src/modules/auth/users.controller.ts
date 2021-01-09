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
      @Body(ValidationPipe) authCredentialsDto: any,
    ): Promise<any> {
       return this.authService.signUp(authCredentialsDto);
    }
  
    @Post('/login')
    login(
      @Body(ValidationPipe) authCredentialsDto: any,
    ): Promise<any> {
       return this.authService.findByName(authCredentialsDto);
    }
  
    @Get('/')
    getUser() {
      return this.authService.findAll();
    }
  
  }
  