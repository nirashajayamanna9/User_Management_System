import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
     private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {

    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      return {
        message: 'Invalid Email or Password',
      };
    }

    if (user.password !== loginDto.password) {
      return {
        message: 'Invalid Email or Password',
      };
    }
     const accessToken = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
    });

    return {
        message: 'Login Successful',
        access_token: accessToken,
        user: user,
    };
  }
}