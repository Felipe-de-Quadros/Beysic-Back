import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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
  async createOrder(@Body() orderData: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() orderData: UpdateOrderDto): Promise<Order> {
    return this.orderService.updateOrder(id, orderData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    await this.orderService.deleteOrder(id);
  }
}
