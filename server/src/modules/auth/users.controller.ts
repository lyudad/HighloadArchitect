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
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

const names = [
  "Anna", "Illia", "Tolia", "Kostia", "Anasrasia", "Tom", "Peter", "Vsevolod", "Nataly", "Lilia",
   "Olga", "Vitaly", "Nazar", "Arshak", "Dima", "Dmytro", "Andrey", "Vadim", "Vlad", "Sofia", "Max", 
   "Bred", "Nadav", "Svetlana", "Borys", "Sviatoslav", "Slava", "Yakov", "Ben", "John", "Roma"
]

const secondNames = [
  "Astahove", "Biletska", "Pelev", "Black", "Seviy", "Kovbasuk", "Vinnik", "Pit", "Joly", "Gerun",
  "Bahatchenko", "Vuhaty", "Nazar", "Bolatov", "Moy", "Hugaev", "Truhanev", "Zelensky",
  "Tymansky", "Sokolova", "Sabyrov", "Karpov", "Popov", "Tolstoy", "Grebenchukov", 
  "Zamiatin", "Kosakov", "Udin", "Gagarin", "Mehun", "Volkov"
]

const city = [
  "NewYork", "Odessa", "Moskov", "Kiev", "Paris", "Dusldorf", "Milan", "Tokio", "Bangladesh", "st Peterburg",
  "Sochi", "Dnepr", "Lviv", "Krakiv", "Talin", "Stokholm", "Krabi", "Kuala-Lumpur"
]
  
 const saltRounds = 10;
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
        const user = await this.authService.findByEmail(loginData);
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

    @Get('/profiles')
    @UseGuards(AuthGuard('jwt'))
    getProfiles(
        @Request() req
    ) {
      return this.authService.findAll(req.user.id);
    }

    @Post('/create-users')
    async createProfiles() {
      const resUsers = []
      for(let i=372556;i<1000000;i++){
        const randomName = Math.floor(Math.random() * names.length);
        const randomSecondNames = Math.floor(Math.random() * secondNames.length);
        const randomCity = Math.floor(Math.random() * city.length);
        const randomNameSelected = names[randomName]
        const user = {
          'firstName': randomNameSelected,
          'lastName': secondNames[randomSecondNames],
          'age': i < 5000 ? i : i - 5000,
          'gender': i%2 === 0 ? 'FEMALE' : 'MALE',
          'interests': i < 5000 ? "interest" + i  : "interest" + (i - 5000),
          'city': city[randomCity],
          'email': `${randomNameSelected+i}@gmail.com`,
          'password': randomNameSelected,
        }
        resUsers.push(user)
        await this.authService.insert(user)
      }
      return resUsers
    }

    @Post('/search')
    async searchUsers(
      @Body(ValidationPipe) searchData: {firstName: string, lastName: string},
    ) {
        await this.authService.searchByUserName(searchData)
    }
  }
  