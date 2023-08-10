import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class AppService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  getHello(): string {
    return 'Hello World!';
  }

  template;
  async insUser(data: any): Promise<any> {
    const res: any = await this.knex('users').insert(data);
    return res;
  }

  async delUser(data: any): Promise<any> {
    const res: any = await this.knex.table('users').where(data).delete();
    return res;
  }

  async updateUser(data: any, dataCondition: any): Promise<any> {
    const res: any = await this.knex
      .table('users')
      .where(dataCondition)
      .update(data);
    return res;
  }
}
