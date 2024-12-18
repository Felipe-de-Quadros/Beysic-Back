import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { PaymentService } from '../payment/payment.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller("ticket")
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly paymentService: PaymentService
  ) {}

  @Get('/category')
  async getAllCategories() {
    return this.ticketService.getAllCategories()
  }

  @Get('/category/:category')
  getTicketsByCategory(@Param('category') category: string) {
    return this.ticketService.getTicketByCategory(category);
  }

  @Post('buy/:ticketId')
  async buyTicket(
    @Param('ticketId') ticketId: number,
    @Body() body: {
      userID: number;
      paymentMethod: string;
      amount: number;
      quantity: number;
    }
  ) {
    const { userID, paymentMethod, amount, quantity } = body;
    return this.paymentService.createPaymentFromCart(userID, paymentMethod);
  }

  @Get()
  getTickets() {
    return this.ticketService.getTickets();
  }

  @Get(':id')
  getTicketById(@Param('id') id: number) {
    return this.ticketService.getTicketById(id);
  }

  @Get('user/:userId')
  getUserTickets(@Param('userId') userId: number) {
    return this.ticketService.getUserTickets(userId);
  }

  @Post()
  createTicket(@Body() ticketData: CreateTicketDto) {
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
