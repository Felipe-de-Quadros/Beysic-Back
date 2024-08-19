import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';

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

createUser(UserData: any) {
  return this.UserRepository.create(UserData);
}

updateUser(id: number, UserData: any) {
  return this.UserRepository.update(id, UserData);
}

deleteUser(id: number) {
  return this.UserRepository.delete(id);
}
}
