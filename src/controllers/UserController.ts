import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/UserService';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {
  }

  @Get()
  getUsers() {
    return this.UserService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.UserService.getUserById(id);
  }

  @Post()
  createUser(@Body() UserData: any) {
    return this.UserService.createUser(UserData);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() UserData: any) {
    return this.UserService.updateUser(id, UserData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.UserService.deleteUser(id);
  }
}