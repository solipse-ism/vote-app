import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class TopicService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async getAllRecentTopic(data: any): Promise<any> {
    const userId = data;
    try {
      const username : any = await this.knex('users')
        .select('username')
        .where('id', `${userId}`)
      const recent : any = await this.knex('vote_content')
        .select('answer', 'topic_id', 'submit_time')
        .where('nickname', `${username[0].username}`)
        console.log(recent);
        return recent;
    }
    catch (error) {
      console.log(error);
      return;
    }
    // const s : any = await this.knex('vote_content')
    //   .select()
    //   .where('public_or_private', 'public');
    // console.log(s);
  }
  
  async updateTopic(data: any, topic: any): Promise<any> {
    const res: any = await this.knex
      .table('topic')
      .where('id', topic.id)
      .update(data);
    console.log(data);
    console.log(topic.id)
    return res;
  }

  async checkID(data: any): Promise<any> {
    try {
      const voteID = await this.knex('topic').where('id', data.id);
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
  async getAllPublicTopics() : Promise <any> {
    const data : any = await this.knex('topic')
      .select()
      .where('public_or_private', 'public');
    return data;
  }

  async getAllTopic(loginID: any): Promise<any> {
    const data: any = await this.knex('topic')
      .select()
      .where('create_by', loginID);
    return data;
  }
  async getOneTopic(topicID: any): Promise<any> {
    const data: any = await this.knex('topic')
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
        const usedID = await this.knex('topic').where('id', data.id);
        if (usedID.length > 0) {
          isUnique = false;
        } else {
          isUnique = true;
          await this.knex('topic').insert(data);
        }
      } while (!isUnique);
      return 1;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
