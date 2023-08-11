import { Knex } from 'nestjs-knex';
export declare class VoteService {
    private readonly knex;
    constructor(knex: Knex);
    insVote(data: any): Promise<any>;
    getAllVote(voteID: any): Promise<any>;
}
