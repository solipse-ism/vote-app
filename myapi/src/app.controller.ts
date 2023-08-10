import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  ins(@Body() body: any): string {
    console.log(body);
    const res: any = this.appService.insUser(body);
    return res;
  }

  @Delete('/:id')
  Delete(@Param() param: any): string {
    const data: any = {};
    data.id = param.id;
    const res: any = this.appService.delUser(data);
    return res;
  }

  @Put('/:id')
  Put(@Body() body: any, @Param() param: any): string {
    const data: any = body;
    const dataCondition: any = {};
    dataCondition.id = param.id;

    const res: any = this.appService.updateUser(data, dataCondition);
    return res;
  }
  @Post('/update')
  up(@Body() body: any): string {
    const data: any = body;
    const dataCondition: any = {};
    dataCondition.id = data.id;
    const dd: any = {};
    dd.username = data.username;
    dd.password = data.password;

    const res: any = this.appService.updateUser(data, dataCondition);
    return res;
  }
}
