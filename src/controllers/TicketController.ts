import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from '../services/TicketService';
import { PaymentService } from '../services/PaymentService';

@Controller("ticket")
export class TicketController {
  constructor(private readonly ticketService: TicketService,
              private readonly paymentService: PaymentService) {
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


  @Post('buy/:ticketId')
  async buyTicket(
    @Param('ticketId') ticketId: number,
    @Body() body : {
      userID:number,
      paymentMethod: string,
      amount: number
    }){
    const { userID, paymentMethod, amount} = body;
    return this.paymentService.createPayment(ticketId, userID, paymentMethod, amount);
  }
}