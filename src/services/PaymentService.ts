import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/OrderRepository';
import { PaymentRepository } from '../repositories/PaymentRepository';
import { Payment } from '../models/Payment';

@Injectable()
export class PaymentService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async createPayment(orderID: number, userID: number, paymentMethod: string, amount: number) {
    const order = await this.orderRepository.getById(orderID);

    if (!order || order.status !== 'PENDING') {
      throw new Error('Order not found or already paid');
    }

    const payment: Partial<Payment> = {
      orderID,
      userID,
      amount,
      paymentMethod: paymentMethod as 'CREDIT_CARD' | 'PIX' | 'PAYPAL',
      status: 'PENDING',
      transactionID: this.generateTransactionID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newPayment = await this.paymentRepository.create(payment);

    const isPaymentSuccessful = this.processPayment(newPayment);

    if (isPaymentSuccessful) {
      await this.paymentRepository.update(newPayment.id, { status: 'COMPLETED' });
      return newPayment;
    } else {
      await this.paymentRepository.update(newPayment.id, { status: 'FAILED' });
      throw new Error('Payment processing failed');
    }
  }

  private processPayment(payment: Payment) {
    return Math.random() > 0.2;
  }

  public async getPaymentStatus(paymentID: number) {
    return this.paymentRepository.getById(paymentID);
  }

  private generateTransactionID() {
    return Math.floor(Math.random() * 1000000);
  }
}
