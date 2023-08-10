import { VoteService } from './vote.service';
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    insVote(body: any): string;
}
