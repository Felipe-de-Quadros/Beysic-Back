import { Injectable } from '@nestjs/common';
import { Payment } from '../models/Payment';
import { OrderRepository } from '../repositories/OrderRepository';

@Injectable()
export class PaymentService {
  private payments: Payment[] = [];

  createPayment(orderID: number, userID: number, paymentMethod: string, amount: number) {
    const order = OrderRepository.findByID(orderID);

    if (!order || order.status !== 'PENDING') {
      throw new Error("Order not found or already paid");
    }

    const payment:Payment = {
      id:this.payments.length + 1,
      orderID,
      userID,
      amount,
      paymentMethod: paymentMethod as 'CREDIT_CARD' | 'PIX' | 'PAYPAL',
      status: 'PENDING',
      transactionID: `txt_${Math.random().toString(16).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.payments.push(payment);
    return payment;
  }

  private processPayment(payment: Payment){
    //logica de processo de pagamento, estamos simulando que 20% dos pagamentos darão errado
    return Math.random() > 0.2;
  }

  public getPaymentStatus(paymentID: number){
    return this.payments.find(payment => payment.id === paymentID)
  }
}