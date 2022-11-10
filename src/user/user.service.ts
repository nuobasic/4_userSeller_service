import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { LogInUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;

    const findUser = await this.userRepository.findOne({ where: { email } });

    if (findUser) {
      throw new UnauthorizedException('이미 존재하는 유저 입니다');
    }
    const hashedPaswword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashedPaswword,
      role,
    });
    const result = await this.userRepository.save(user);
    return result;
  }
  async logIn(loginUserDto: LogInUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login 실패');
    }
  }
}
