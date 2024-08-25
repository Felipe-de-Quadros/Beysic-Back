import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/User';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public getAll() {
    return this.userRepository.find();
  }

  public getById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  public create(userData: Partial<User>) {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  public update(id: number, userData: Partial<User>) {
    return this.userRepository.save({ id, ...userData });
  }

  public delete(id: number) {
    return this.userRepository.delete(id);
  }
}
