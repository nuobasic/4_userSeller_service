import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signUp(createUserDto);
  }
  @Post('login')
  async logIn(@Body() logInUserDto: LogInUserDto) {
    return await this.userService.logIn(logInUserDto);
  }
}
