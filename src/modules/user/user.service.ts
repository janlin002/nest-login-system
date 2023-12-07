import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/entity/user.entities';
import { CreateUserDto } from './dto/createUser.dto';
import { UserChangePasswordDto } from './dto/userChangePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const found = this.userRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return found;
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = this.userRepository.findOne({
      where: { email },
    });

    if (!found) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return found;
  }

  async userChangePassword(userChangePasswordDto: UserChangePasswordDto) {
    const { email, password } = userChangePasswordDto;
    const found = await this.getUserByEmail(email);

    if (!found) return;

    found.password = password;

    this.userRepository.save(found);

    return userChangePasswordDto;
  }

  async createNewUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const found = await this.getUserByEmail(email);

    if (found) return;

    this.userRepository.save(createUserDto);

    return createUserDto;
  }

  async deleteUserById(email: string): Promise<User> {
    const found = await this.getUserByEmail(email);

    if (!found) return;

    this.userRepository.delete(found);

    return found;
  }
}
