import { Module } from '@nestjs/common';
import { TicketRepositoryModule } from '../repositories/ticket/ticket-repository.module';
import { TicketController } from '../controllers/TicketController';

@Module({
  imports: [TicketRepositoryModule],
  controllers: [TicketController],
  providers: [],
})
export class TicketRoutesModule {}
