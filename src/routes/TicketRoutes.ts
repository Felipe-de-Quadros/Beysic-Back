import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TicketController } from '../controllers/TicketController';
import { TicketService } from '../services/TicketService';
import { TicketRepository } from '../repositories/TicketRepository';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'tickets',
        module: TicketRoutesModule,
      },
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService, TicketRepository],
})
export class TicketRoutesModule {}
