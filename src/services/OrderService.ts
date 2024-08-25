import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../repositories/OrderRepository';
import { Order } from '../models/Order';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepository.getById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    return this.orderRepository.create(orderData);
  }

  async updateOrder(id: number, orderData: Partial<Order>): Promise<Order> {
    const existingOrder = await this.orderRepository.getById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.orderRepository.update(id, orderData);
  }

  async deleteOrder(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
