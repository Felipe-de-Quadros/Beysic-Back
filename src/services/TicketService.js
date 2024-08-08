import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../repositories/TicketRepository';

@Injectable()
export class TicketService {

  static getTickets(){
    return TicketRepository.getAll();
  }
}
