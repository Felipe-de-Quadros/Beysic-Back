import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly UserRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  async authenticate(login: string, password: string): Promise<{access_token: string}> {
    const user: User | null = await this.UserRepository.findOneByEmail({ where: { email: login } });
    if (!user) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const isPWValid = await bcrypt.compare(password, user.password);

    if (!isPWValid){
      throw new UnauthorizedException("Invalid Credentials");
    }

    const payload = { sub: user.id, username: user.name };
    const token = await this.jwtService.signAsync(payload)
    return {
      access_token: token,
    }
  }
}