import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {
  }

  get() {
    return this.UserRepository.getAll();
  }

  getById(id: number) {
    return this.UserRepository.getById(id);
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.UserRepository.findOneByEmail({where : {email : createUserDto.email}});
    if (existingUser) {
      throw new ConflictException("User already exists!");
    }
    const hashedPw = await this.encryptPassword(createUserDto.password);
    const user = {name: createUserDto.name, email: createUserDto.email, password: hashedPw};
    return this.UserRepository.create(user);
  }

  update(id: number, UserData: any) {
    return this.UserRepository.update(id, UserData);
  }

  delete(id: number) {
    return this.UserRepository.delete(id);
  }

  private encryptPassword(pw: string): Promise<string> {
    return bcrypt.hash(pw, 10)
  }
}
