import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import { AuthService } from './services/AuthService';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/LoginController';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    JwtModule.register({
      global : true,
      secret : process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    TicketController,
    OrderController,
    PaymentController,
    UserController,
    LoginController,
  ],
  providers: [
    TicketRepository,
    OrderRepository,
    PaymentRepository,
    UserRepository,
    TicketService,
    OrderService,
    PaymentService,
    UserService,
    AuthService,
  ],
})
export class AppModule {}
