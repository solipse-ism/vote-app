import { TopicService } from './topic.service';
export declare class TopicController {
    private readonly topicService;
    constructor(topicService: TopicService);
    findAllRecentTopic(params: any): string;
    findAllTopic(params: any): string;
    findOneTopic(params: any): string;
    findAllPublicTopic(): string;
    findAllPublicTopics(): string;
    checkID(body: any): string;
    Put(body: any, param: any): string;
    insTopic(body: any): string;
}
