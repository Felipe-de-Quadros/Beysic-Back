import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../models/Order';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  public getAll() {
    return this.orderRepository.find();
  }

  public getById(id: number) {
    return this.orderRepository.findOneBy({ id });
  }

  public create(orderData: Partial<Order>) {
    const newOrder = this.orderRepository.create(orderData);
    return this.orderRepository.save(newOrder);
  }

  public update(id: number, orderData: Partial<Order>) {
    return this.orderRepository.save({ id, ...orderData });
  }

  public delete(id: number) {
    return this.orderRepository.delete(id);
  }
}
