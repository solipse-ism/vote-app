import { Controller, Post, Body, Param } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}
  
  @Post()
  insVote(@Body() body: any): string {
    const res: any = this.voteService.insVote(body);
    return res;
  }
}
