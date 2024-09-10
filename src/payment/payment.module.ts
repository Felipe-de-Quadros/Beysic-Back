import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { PaymentRepository } from './payment.repository';
import { TicketModule } from '../ticket/ticket.module';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { ShopCartModule } from '../shop-cart/shop-cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    TicketModule,
    OrderModule,
    UserModule,
    ShopCartModule,
  ],
  providers: [PaymentService, PaymentRepository],
  controllers: [PaymentController],
  exports: [PaymentRepository],
})
export class PaymentModule {}
