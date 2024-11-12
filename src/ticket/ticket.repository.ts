import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';

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

  public getByCategory(categories: string){
    return this.ticketRepository.findOneBy({ categories });
  }

  public async getAllCategories() {
    const tickets = await this.getAll();
    let categories: string[] = []
    tickets.forEach(ticket => {
      categories = categories.concat(ticket.categories);

    })
    const uniqueCategories = Array.from(new Set(categories))
    return uniqueCategories.map((category, index) => ({
      key:index,
      name:category
    }))
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

  public async decrementQuantity(ticketId: number, quantity: number) {
    const ticket = await this.getById(ticketId);
    if (ticket && ticket.availableQuantity >= quantity) {
      ticket.availableQuantity -= quantity;
      return this.ticketRepository.save(ticket);
    }
    throw new Error('Not enough tickets available');
  }

}
