import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class TopicService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async updateTopic(data: any, topic: any): Promise<any> {
    const res: any = await this.knex
      .table('spread_head')
      .where('id', topic.id)
      .update(data);
    return res;
  }

  async checkID(data: any): Promise<any> {
    try {
      const voteID = await this.knex('spread_head').where('id', data.id);
      if (voteID.length > 0) {
        return { success : 'Successful Search'};
      } else {
        return { error : 'Invalid Vote ID' };
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getAllTopic(loginID: any): Promise<any> {
    const data: any = await this.knex('spread_head')
      .select()
      .where('create_by', loginID);
    return data;
  }
  async getOneTopic(topicID: any): Promise<any> {
    const data: any = await this.knex('spread_head')
      .select()
      .where('id', topicID);
    return data[0];
  }

  generateVoteCode(): string {
    const currentDatetime = new Date();
    const formattedDatetime =
      currentDatetime.getFullYear().toString() +
      this.padZero(currentDatetime.getMonth() + 1) +
      this.padZero(currentDatetime.getDate()) +
      this.padZero(currentDatetime.getHours()) +
      this.padZero(currentDatetime.getMinutes()) +
      this.padZero(currentDatetime.getSeconds());
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const prefix = letters[Math.floor(Math.random() * letters.length)];
    const digits = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
    let voteCode = prefix + digits + formattedDatetime;
    return voteCode;
  }
  private padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }
  async insTopic(data: any): Promise<any> {
    try {
      let isUnique = true;
      do {
        data.id = this.generateVoteCode();
        const usedID = await this.knex('spread_head').where('id', data.id);
        if (usedID.length > 0) {
          isUnique = false;
        } else {
          isUnique = true;
          await this.knex('spread_head').insert(data);
        }
      } while (!isUnique);
      return 1;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
