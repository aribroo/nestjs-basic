import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller({ path: 'api', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getUsers(@Res() res: Response): Promise<any> {
    const result = await this.userService.getUsers();
    return res.json({ data: result });
  }

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.userService.createUser(createUserDto);
    return res.status(200).json({ data: result });
  }

  @Patch('user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: string,
    @Res() res: Response,
  ) {
    const result = await this.userService.updateUser(id, body);
    return res.status(200).json({ data: result });
  }

  @Delete('user/:id')
  async deleteUser(
    @Param('id') id: number,
    @Res() res: Response,
    @Query() pagingQuery: string,
  ) {
    const result = await this.userService.deleteUser(id);
    return res.status(200).json({ data: result });
  }
}

export interface User {
  username: string;
}
