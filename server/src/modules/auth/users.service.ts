import { Injectable } from '@nestjs/common';
import {MysqlHelper} from '../../helpers/mysql'
import * as bcrypt from 'bcrypt'

const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    private usersRepository: MysqlHelper,
  ) {}

  async findAll(id: number): Promise<any> {
    return this.usersRepository.query('Select * from users Where id!=? Limit 20', [id]);
  }

  findOne(id: string): Promise<any> {
    return this.usersRepository.query(`Select * from users where id=? LIMIT 1`, [id], true);
  }

  async signUp(data: any): Promise<any> {
    const fields = ['firstName', 'lastName', 'age', 'gender', 'interests', 'city', 'email', 'password'] 
    const passwordEncrypted = await bcrypt.hash(data.password, saltRounds);
    const values = [data.firstName, data.lastName, data.age, data.gender, data.interests, data.city, data.email, passwordEncrypted] 
    const res = await this.usersRepository.query(`INSERT INTO users (??) VALUES (?)`, [fields, values] )
    console.log('res', res)
    return this.usersRepository.query<string>(`SELECT * FROM users WHERE email=? and password=? LIMIT 1`, [data.email, passwordEncrypted], true)
  }

  async insert(data: any): Promise<any> {
    const fields = ['firstName', 'lastName', 'age', 'gender', 'interests', 'city', 'email', 'password'] 
    const passwordEncrypted = await bcrypt.hash(data.password, saltRounds);
    const values = [data.firstName, data.lastName, data.age, data.gender, data.interests, data.city, data.email, passwordEncrypted] 
    const res = await this.usersRepository.query(`INSERT INTO users (??) VALUES (?)`, [fields, values] )
    console.log('res', res)
    return res;
  }

  async findByEmail(data: {email: string, password: string}): Promise<any> {
    const user: any = await this.usersRepository.query<string>(`SELECT * FROM users WHERE email=? LIMIT 1`, [data.email], true)
    console.log('user>>>', user)
    if(user && await bcrypt.compare(data.password, user.password)){
      return user;
    } else {
      return null;
    }

    //return this.usersRepository.query<string>(`SELECT * FROM users WHERE email=? AND password=? LIMIT 1`, [data.email, passwordEncrypted], true)
  }

  async searchByUserName(data: {firstName: string, lastName: string}): Promise<any> {
    const users = await this.usersRepository.query<string>(`SELECT * FROM users  Where firstName LIKE CONCAT('%', ?,  '%') and lastName LIKE CONCAT('%', ?,  '%')  Limit 20`, [data.firstName, data.lastName])
    return users;

    // const users = await this.usersRepository.query<string>(query, params)
    // return users;

    // return this.usersRepository.query<string>(`SELECT * FROM users WHERE email=? AND password=? LIMIT 1`, [data.email, passwordEncrypted], true)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.query<string>(`DELETE FROM users WHERE id=?`, [id]);
  }

}