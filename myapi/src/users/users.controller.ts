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

  // @Get()
  // findOne(@Param() params: any): string {
  //   console.log(params.id);

  //   const res: any = this.usersService.getAllUser(params.id);
  //   return res;
  // }

  @Post('/checklogin')
  Post(@Body() body: any): string {
    console.log(body);
    const res: any = this.usersService.checkLogin(body);
    return res;
  }
}
