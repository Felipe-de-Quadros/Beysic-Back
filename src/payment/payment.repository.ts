import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  public getAll() {
    return this.paymentRepository.find();
  }

  public getById(id: number) {
    return this.paymentRepository.findOneBy({ id });
  }

  public create(paymentData: Partial<Payment>) {
    const newPayment = this.paymentRepository.create(paymentData);
    return this.paymentRepository.save(newPayment);
  }

  public update(id: number, paymentData: Partial<Payment>) {
    return this.paymentRepository.save({ id, ...paymentData });
  }

  public delete(id: number) {
    return this.paymentRepository.delete(id);
  }
}
