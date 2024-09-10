import { forwardRef, Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(()=> PaymentModule)
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
  exports: [TicketRepository],
})
export class TicketModule {}
