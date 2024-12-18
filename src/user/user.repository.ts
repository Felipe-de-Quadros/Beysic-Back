import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

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
    return this.userRepository.create(userData);
  }

  public update(id: number, userData: Partial<User>) {
    return this.userRepository.save({ id, ...userData });
  }

  public delete(id: number) {
    return this.userRepository.delete(id);
  }

  public async findOneByEmail(param: { where: { email: string } }): Promise<User | null> {
    return this.userRepository.findOne(param);
  }

  public async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(options);
  }

  async save(user: User) {
    return this.userRepository.save(user)
  }
}
