import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '@/entity/user.entities';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async findUserByEmail(email: string): Promise<void> {
    const found = this.usersRepository.findOne({ where: { email } });

    if (found) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
  }

  // 登入
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // compare(待比較的明碼, hash)
    const isSameUser = await bcrypt.compare(password, user.password);

    if (!isSameUser) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    // jwt
    const access_token = await this.jwtService.signAsync(loginDto);

    return {
      status: HttpStatus.OK,
      message: 'User logged in successfully',
      access_token,
    };
  }

  // 註冊
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      this.usersRepository.save({
        email,
        password: passwordHash,
      });

      return {
        status: HttpStatus.OK,
        message: 'User registered successfully',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // passport 驗證使用者
  // async validateUser(validateDto: ValidateDto): Promise<User> {}
}
