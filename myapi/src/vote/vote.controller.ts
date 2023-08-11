import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}
  
  @Post()
  insVote(@Body() body: any): string {
    console.log(body);
    const res: any = this.voteService.insVote(body);
    return res;
  }
  @Get('all/:id')
  findAll(@Param() params: any): string{
    const res: any = this.voteService.getAllVote(params.id);
    return res;
  }
}
