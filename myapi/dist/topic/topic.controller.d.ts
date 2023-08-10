import { TopicService } from './topic.service';
export declare class TopicController {
    private readonly topicService;
    constructor(topicService: TopicService);
    findAllTopic(params: any): string;
    findOneTopic(params: any): string;
    checkID(body: any): string;
    Put(body: any, param: any): string;
    insTopic(body: any): string;
}
