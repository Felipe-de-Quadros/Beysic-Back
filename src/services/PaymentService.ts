import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../repositories/OrderRepository';
import { PaymentRepository } from '../repositories/PaymentRepository';
import { Payment } from '../models/Payment';
import { TicketRepository } from '../repositories/ticket/TicketRepository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async createPayment(ticketID: number, userID: number, paymentMethod: string, amount: number, quantity: number) {
    const ticket = await this.ticketRepository.getById(ticketID);
    if (!ticket || ticket.availableQuantity <= 0) {
      throw new Error("Ticket not available!")
    }

    const newOrder = await this.orderRepository.create({
      ticketID,
      userID,
      quantity,
      totalAmount: amount,
      status : 'PENDING'
    })

    const payment: Payment = {
      id : 0,
      orderID : newOrder.id,
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
      await this.ticketRepository.decrementQuantity(ticketID,quantity)
      await this.paymentRepository.update(newPayment.id, { status: 'COMPLETED' });
      await this.orderRepository.update(newOrder.id, {status: 'PAID'})
      return newPayment;
    } else {
      await this.paymentRepository.update(newPayment.id, { status: 'FAILED' });
      await this.orderRepository.update(newOrder.id, { status: 'CANCELLED' });
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
