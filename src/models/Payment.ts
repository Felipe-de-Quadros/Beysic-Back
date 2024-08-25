import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  orderID: number = 0;

  @Column()
  userID:number = 0;

  @Column("decimal")
  amount: number = 0.0;

  @Column({ type: 'varchar', length: 255 })
  paymentMethod: 'CREDIT_CARD' | 'PIX' | 'PAYPAL' = 'PIX';

  @Column({ type: 'varchar', length: 255 })
  status: 'PENDING' | 'COMPLETED' | 'FAILED' = 'PENDING';

  @Column({type: 'varchar', length: 255 })
  transactionID: number = 0;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date = new Date();
}