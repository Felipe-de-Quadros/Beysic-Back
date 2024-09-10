import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';

@Module({
  imports : [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderRepository],
})
export class OrderModule {}
