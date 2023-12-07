import { Controller, Delete, Get, Post, Body, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserEmailDto } from './dto/userEmail.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserChangePasswordDto } from './dto/userChangePassword.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/getUserByEmail')
  getUserByEmail(@Body() userEmailDto: UserEmailDto) {
    const { email } = userEmailDto;
    return this.userService.getUserByEmail(email);
  }

  @Patch('/userChangePassword')
  userChangePassword(@Body() userChangePasswordDto: UserChangePasswordDto) {
    return this.userService.userChangePassword(userChangePasswordDto);
  }

  @Post('/createNewUser')
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createNewUser(createUserDto);
  }

  @Delete('/deleteUserByEmail')
  deleteUserByEmail(@Body() userEmailDto: UserEmailDto) {
    const { email } = userEmailDto;
    return this.userService.deleteUserById(email);
  }
}
