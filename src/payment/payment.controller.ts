import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Post('cart/:userId')
  createPaymentFromCart(@Param('userId') userId: number, @Body() body: { paymentMethod: string }) {
    return this.paymentService.createPaymentFromCart(userId, body.paymentMethod);
  }

  @Get()
  getPaymentStatus(@Param('id') paymentID: number){
    return this.paymentService.getPaymentStatus(paymentID);
  }
}