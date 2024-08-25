import { Module } from '@nestjs/common';
import { TicketRepository } from './TicketRepository';

@Module({
  providers: [TicketRepository],
  exports: [TicketRepository],
})
export class TicketRepositoryModule {}
