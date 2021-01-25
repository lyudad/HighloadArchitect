import { Injectable } from '@nestjs/common';
import {MysqlHelper} from '../../helpers/mysql'

@Injectable()
export class FriendsService {
  constructor(
    private friendsRepository: MysqlHelper,
  ) {}

  add(userId, friendId): Promise<any> {
    const fields = ['userId', 'friendId'] 
    const values = [userId, friendId] 
    return this.friendsRepository.query(`INSERT INTO friends (??) VALUES (?)`, [fields, values] )
  }

  async remove(id: string): Promise<void> {
    await this.friendsRepository.query<string>(`DELETE FROM friends WHERE id=?`, [id]);
  }
}