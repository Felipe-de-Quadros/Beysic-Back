import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../models/Ticket';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  public getAll() {
    return this.ticketRepository.find();
  }

  public getById(id: number) {
    return this.ticketRepository.findOneBy({ id });
  }

  public create(ticketData: Partial<Ticket>) {
    const newTicket = this.ticketRepository.create(ticketData);
    return this.ticketRepository.save(newTicket);
  }

  public update(id: number, ticketData: Partial<Ticket>) {
    return this.ticketRepository.save({ id, ...ticketData });
  }

  public delete(id: number) {
    return this.ticketRepository.delete(id);
  }
}
