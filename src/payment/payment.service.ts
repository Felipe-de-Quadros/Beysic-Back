import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { OrderRepository } from '../order/order.repository';
import { PaymentRepository } from './payment.repository';
import { Payment } from './entities/payment.entity';
import { TicketRepository } from '../ticket/ticket.repository';
import { UserRepository } from '../user/user.repository';
import { ShopCartRepository } from '../shop-cart/shop-cart.repository';

@Injectable()
export class PaymentService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
    private readonly shopCartRepository: ShopCartRepository
  ) {}

  async createPaymentFromCart(userID: number, paymentMethod: string): Promise<Payment[]> {
    const user = await this.userRepository.getById(userID);
    const cart = await this.shopCartRepository.getByUserId(userID);

    if (user == null){
      throw new Error('Nao foi possivel encontrar o usuario');
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      throw new Error('Carrinho vazio ou não encontrado!');
    }

    for (const item of cart.items) {
      const ticket = item.ticket;
      if (ticket == null) {
        throw new Error('Ticket nao encontrado!');
      }
      if (ticket.availableQuantity < item.quantity) {
        throw new Error(`Ticket ${ticket.eventName} não tem quantidade suficiente disponível!`);
      }
    }

    const payments: Payment[] = [];
    for (const item of cart.items) {
      const ticket = item.ticket;

      if (ticket == null) {
        throw new Error('Ticket nao encontrado!');
      }

      const newOrder = await this.orderRepository.create({
        ticketID: ticket.id,
        userID: user.id,
        quantity: item.quantity,
        totalAmount: ticket.price * item.quantity,
        status: 'PENDING',
      });

      const payment: Payment = {
        id: 0,
        orderID: newOrder.id,
        userID,
        amount: ticket.price * item.quantity,
        paymentMethod: paymentMethod as 'CREDIT_CARD' | 'PIX' | 'PAYPAL',
        status: 'PENDING',
        transactionID: this.generateTransactionID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newPayment = await this.paymentRepository.create(payment);
      const isPaymentSuccessful = this.processPayment(newPayment);

      if (isPaymentSuccessful) {
        await this.ticketRepository.decrementQuantity(ticket.id, item.quantity);
        await this.paymentRepository.update(newPayment.id, { status: 'COMPLETED' });
        await this.orderRepository.update(newOrder.id, { status: 'PAID' });

        if (!user.tickets) {
          user.tickets = [];
        }
        for (let i = 0; i < item.quantity; i++) {
          user.tickets.push(ticket);
        }

        payments.push(newPayment);
      } else {
        await this.paymentRepository.update(newPayment.id, { status: 'FAILED' });
        await this.orderRepository.update(newOrder.id, { status: 'CANCELLED' });
        throw new Error(`Falha ao processar o pagamento para o ticket ${ticket.eventName}`);
      }
    }

    cart.items = [];
    await this.shopCartRepository.save(cart);
    await this.userRepository.save(user);

    return payments;
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
