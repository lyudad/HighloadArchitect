import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  signUp(data: any): Promise<User> {
    return this.usersRepository.save(data)
  }

  findByName(data: {email: string, password: string}): Promise<User> {
    return this.usersRepository.findOne(data)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}