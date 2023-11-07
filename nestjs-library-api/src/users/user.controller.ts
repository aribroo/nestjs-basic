import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user/signup')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<{ data: { name: string; email: string } }> {
    const result = await this.userService.signUp(signUpDto);
    return { data: result };
  }

  @Post('user/login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ data: { token: string } }> {
    const result = await this.userService.login(loginDto);
    return { data: result };
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<any> {
    const result = await this.userService.getUser(id);
    return { data: result };
  }
  @Patch('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    const result = await this.userService.updateUser(id, body);
    return { data: result };
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<{ data: string }> {
    await this.userService.deleteUser(id);
    return { data: 'OK' };
  }
}
