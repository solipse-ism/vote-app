import { Param, Controller, Get, Post, Put, Body } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get('recent/:id')
  findAllRecentTopic(@Param() params: any): string {
    console.log(params.id);
    const res: any = this.topicService.getAllRecentTopic(params.id);
    return res;
  }
  @Get('all/:id')
  findAllTopic(@Param() params: any): string {
    const res: any = this.topicService.getAllTopic(params.id);
    return res;
  }
  @Get(':id')
  findOneTopic(@Param() params: any): string {
    const res: any = this.topicService.getOneTopic(params.id);
    return res;
  }
  @Get('public/')
  findAllPublicTopic(): string {
    console.log("success");
    const res: any = this.topicService.getAllPublicTopics();
    return("Success");
  }
  @Get()
  findAllPublicTopics(): string {
    const res: any = this.topicService.getAllPublicTopics();
    return res;
  }

  @Post('checkID/')
  checkID(@Body() body: any): string {
    const res: any = this.topicService.checkID(body);
    return res;
  }

  @Put('/update/:id')
  Put(@Body() body: any, @Param() param: any): string {
    const data: any = body;
    const topic: any = {};
    topic.id = param.id;
    const res: any = this.topicService.updateTopic(data, topic);
    return res;
  }

  @Post('create/')
  insTopic(@Body() body: any): string {
    const res: any = this.topicService.insTopic(body);
    return res;
  }
}
