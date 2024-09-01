import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from '../services/AuthService';

@Controller("auth")
export class LoginController {
  constructor(private readonly AuthService: AuthService) {
  }


  @Post('login')
  login(@Body() loginDto :{ login: string, password:string}) {
    return this.AuthService.authenticate(loginDto.login, loginDto.password);
  }

}