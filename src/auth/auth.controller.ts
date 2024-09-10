import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller("auth")
export class AuthController {
  constructor(private readonly AuthService: AuthService) {
  }


  @Post('login')
  login(@Body() loginDto :{ login: string, password:string}) {
    return this.AuthService.authenticate(loginDto.login, loginDto.password);
  }

}