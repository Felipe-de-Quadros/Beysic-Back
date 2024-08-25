import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { OrderService } from '../services/OrderService';
import { Order } from '../models/Order';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  async createOrder(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() orderData: Partial<Order>): Promise<Order> {
    return this.orderService.updateOrder(id, orderData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}
