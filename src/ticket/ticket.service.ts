import { Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {
  }

  getTickets() {
    return this.ticketRepository.getAll();
  }

  getTicketById(id: number) {
    return this.ticketRepository.getById(id);
  }

  createTicket(ticketData: CreateTicketDto) {
    return this.ticketRepository.create(ticketData);
  }

  updateTicket(id: number, ticketData: any) {
    return this.ticketRepository.update(id, ticketData);
  }

  deleteTicket(id: number) {
    return this.ticketRepository.delete(id);
  }
}
