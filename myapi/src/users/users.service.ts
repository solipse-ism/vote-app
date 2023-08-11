import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class UsersService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  // async getAllUser(): Promise<any> {
  //   const sql = `SELECT * FROM users`;
  //   const data: any = await this.knex.raw(sql);
  //   console.log(data[0]);
  //   return data[0];
  // }

  async checkLogin(data: any): Promise<any> {
    const { username, password } = data;
    try {
      const res: any = await this.knex
        .select('id')
        .from('users')
        .where({ username, password });

      if (res.length > 0) {
        return res[0];
      } else {
        return { error: 'invalid' };
      }
    } catch {
      return { error: 'invalid' };
    }
  }
}
