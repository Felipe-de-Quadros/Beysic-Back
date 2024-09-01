import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/UserRepository';
import * as bcrypt from 'bcrypt';
import { User } from '../models/User';

@Injectable()
export class AuthService {

  constructor(
    private readonly UserRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  async authenticate(login: string, password: string) {
    const user: User | null = await this.UserRepository.findOneByEmail({ where: { email: login } });

    if (!user) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const isPWValid = await bcrypt.compare(password, user.password);

    if (!isPWValid){
      throw new UnauthorizedException("Invalid Credentials");
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload)

    return {
      access_token: token,
    }
  }
}