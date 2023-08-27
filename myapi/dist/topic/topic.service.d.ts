import { Knex } from 'nestjs-knex';
export declare class TopicService {
    private readonly knex;
    constructor(knex: Knex);
    getAllRecentTopic(data: any): Promise<any>;
    updateTopic(data: any, topic: any): Promise<any>;
    checkID(data: any): Promise<any>;
    getAllPublicTopics(): Promise<any>;
    getAllTopic(loginID: any): Promise<any>;
    getOneTopic(topicID: any): Promise<any>;
    generateVoteCode(): string;
    private padZero;
    insTopic(data: any): Promise<any>;
}
