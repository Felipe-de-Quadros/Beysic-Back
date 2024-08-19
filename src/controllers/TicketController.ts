import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from '../services/TicketService';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {
  }

  @Get()
  getTickets() {
    return this.ticketService.getTickets();
  }

  @Get(':id')
  getTicketById(@Param('id') id: number) {
    return this.ticketService.getTicketById(id);
  }

  @Post()
  createTicket(@Body() ticketData: any) {
    return this.ticketService.createTicket(ticketData);
  }

  @Put(':id')
  updateTicket(@Param('id') id: number, @Body() ticketData: any) {
    return this.ticketService.updateTicket(id, ticketData);
  }

  @Delete(':id')
  deleteTicket(@Param('id') id: number) {
    return this.ticketService.deleteTicket(id);
  }
}