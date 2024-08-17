import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from '../services/PaymentService';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createPayment(@Body() paymentData : any){
    const {orderID, userID, paymentMethod, amount} = paymentData;
    return this.paymentService.createPayment(orderID, userID, paymentMethod, amount);
  }

  @Get()
  getPaymentStatus(@Param('id') paymentID: number){
    return this.paymentService.getPaymentStatus(paymentID);
  }
}