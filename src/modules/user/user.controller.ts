import { Controller, Delete, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  getUserById() {
    return this.userService.getUserById();
  }

  @Post()
  userChangePassword() {
    return this.userService.userChangePassword();
  }

  @Post()
  createNewUser() {
    return this.userService.createNewUser();
  }

  @Delete()
  deleteUserById() {
    return this.userService.deleteUserById();
  }
}
