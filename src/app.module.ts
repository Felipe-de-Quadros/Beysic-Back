import { Module } from '@nestjs/common';
import { TicketRoutesModule } from './routes/TicketRoutes';
import { PaymentRoutesModule } from './routes/PaymentRoutes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './models/Payment';
import { Order } from './models/Order';
import { Ticket } from './models/Ticket';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tales',
      password: 'Masterkey',
      database: 'beysic',
      entities: [Ticket,Order,Payment],
      synchronize: false, // quando usar migrations, botar pra FALSE
    }),
    TypeOrmModule.forFeature([Ticket, Order, Payment]),
    TicketRoutesModule,
    PaymentRoutesModule
  ],
})
export class AppModule {}
