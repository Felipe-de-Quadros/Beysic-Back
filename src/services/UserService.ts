import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {
  }

getUsers() {
  return this.UserRepository.getAll();
}

getUserById(id: number) {
  return this.UserRepository.getById(id);
}

async createUser(UserData: any) {
    const existingUser = await this.UserRepository.findOneByEmail({where : {email : UserData.email}});
    if (existingUser) {
      throw new ConflictException("User already exists");
    }
    const hashedPw = await this.encryptPassword(UserData.password);
    const user = {name: UserData.name, email: UserData.email, password: hashedPw};
    console.log(user)
  return this.UserRepository.create(user);
}

updateUser(id: number, UserData: any) {
  return this.UserRepository.update(id, UserData);
}

deleteUser(id: number) {
  return this.UserRepository.delete(id);
}

private encryptPassword(pw: string): Promise<string> {
    return bcrypt.hash(pw, 10)
}
}
