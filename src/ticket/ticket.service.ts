import { Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository
  ) {
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

  getTicketByCategory(category: string) {
    return this.ticketRepository.getByCategory(category);
  }

  async getAllCategories(){
    return this.ticketRepository.getAllCategories()
  }

  async getUserTickets(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['tickets'],
    });

    if (!user || !user.tickets) {
      throw new Error('Usuário ou tickets não encontrados');
    }

    return user.tickets.map(ticket => ({
      id: ticket.id,
      eventName: ticket.eventName,
      categories: ticket.categories,
      place: ticket.place,
      city: ticket.city,
      state: ticket.state,
      price: ticket.price,
      availableQuantity: ticket.availableQuantity,
    }));
  }
}
