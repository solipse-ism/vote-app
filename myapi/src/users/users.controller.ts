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
  @Get(":id")
  getUserById(@Param() param: string): string {
    const res: any = this.usersService.getUserById(param);
    return res;
  }

  @Post('/checklogin')
  Post(@Body() body: any): string {
    console.log(true);
    const res: any = this.usersService.checkLogin(body);
    return res;
  }
}
