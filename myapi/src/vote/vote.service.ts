import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class VoteService {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async insVote(data: any): Promise<any> {
    
  }
}
