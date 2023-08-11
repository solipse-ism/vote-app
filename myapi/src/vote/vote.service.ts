import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class VoteService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async insVote(data: any): Promise<any> {
    try {
      await this.knex('vote_content').insert(data);
      return { 'success': true};
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getAllVote(voteID : any): Promise<any> {
    const data: any = await this.knex('vote_content')
    .select()
    .where('topic_id', voteID);
    return data;
  }
}
