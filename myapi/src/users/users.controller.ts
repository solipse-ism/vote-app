import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('all')
  // findOne(): string {
  //   const res: any = this.usersService.getAllUser();
  //   return res;
  // }

  @Post('/checklogin')
  Post(@Body() body: any): string {
    console.log(body);
    const res: any = this.usersService.checkLogin(body);
    return res;
  }
}
