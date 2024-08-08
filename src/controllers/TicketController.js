import { Controller, Get } from '@nestjs/common';
import { TicketService } from '../services/TicketService';

@Controller()
export class TicketController {
  ticketService =TicketService();

  @Get()
  getTickets() {
    return this.ticketService.getTickets();
  }
}