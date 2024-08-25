import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './models/Ticket';
import { Order } from './models/Order';
import { Payment } from './models/Payment';
import { User } from './models/User';
import { TicketRepository } from './repositories/ticket/TicketRepository';
import { OrderRepository } from './repositories/OrderRepository';
import { PaymentRepository } from './repositories/PaymentRepository';
import { TicketService } from './services/TicketService';
import { OrderService } from './services/OrderService';
import { PaymentService } from './services/PaymentService';
import { TicketController } from './controllers/TicketController';
import { OrderController } from './controllers/OrderController';
import { PaymentController } from './controllers/PaymentController';
import { UserController } from './controllers/UserController';
import { UserService } from './services/UserService';
import { UserRepository } from './repositories/UserRepository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tales',
      password: 'Masterkey',
      database: 'beysic',
      entities: [Ticket, Order, Payment, User],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Ticket, Order, Payment, User]),
  ],
  controllers: [
    TicketController,
    OrderController,
    PaymentController,
    UserController
  ],
  providers: [
    TicketRepository,
    OrderRepository,
    PaymentRepository,
    UserRepository,
    TicketService,
    OrderService,
    PaymentService,
    UserService
  ],
})
export class AppModule {}
