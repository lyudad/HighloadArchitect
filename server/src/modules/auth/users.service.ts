import { Injectable } from '@nestjs/common';
 import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { User } from './users.entity';
import {MysqlHelper} from '../../helpers/mysql'

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: MysqlHelper,
  ) {}

  async findAll(): Promise<any> {
    return this.usersRepository.query('Select * from users');
  }

  findOne(id: string): Promise<any> {
    return this.usersRepository.query(`Select * from users where id=? LIMIT 1`, [id], true);
  }

  signUp(data: any): Promise<any> {
    const fields = ['firstName', 'lastName', 'age', 'gender', 'interests', 'city', 'email', 'password'] 
    const values = [data.firstName, data.lastName, data.age, data.gender, data.interests, data.city, data.email, data.password] 
    return this.usersRepository.query(`INSERT INTO users (??) VALUES (?)`, [fields, values] )
  }

  findByName(data: {email: string, password: string}): Promise<any> {
    return this.usersRepository.query<string>(`SELECT * FROM users WHERE email=? AND password=? LIMIT 1`, [data.email, data.password], true)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.query<string>(`DELETE FROM users WHERE id=?`, [id]);
  }
}