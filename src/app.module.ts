import { Module } from '@nestjs/common';
import { TicketRoutesModule } from './routes/TicketRoutes';
import { PaymentRoutesModule } from './routes/PaymentRoutes';
import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Payment } from './models/Payment';
import { Order } from './models/Order';
import { Ticket } from './models/Ticket';
dotenv.configDotenv()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dotenv('DATABASE_HOST'),
      port: dotenv('DATABASE_PORT'),
      username: dotenv('DATABASE_USERNAME'),
      password: dotenv('DATABASE_PASSWORD'),
      database: dotenv('DATABASE_NAME'),
      entities: [Ticket,Order,Payment],
      synchronize: true, // EM PROD BOTAR COMO FALSO
    }),
    TypeOrmModule.forFeature([Ticket, Order, Payment]),
    TicketRoutesModule,
    PaymentRoutesModule
  ],
})
export class AppModule {}
