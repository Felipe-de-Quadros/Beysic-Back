import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderID: number;

  @Column()
  userID:number;

  @Column("decimal")
  amount: number;

  @Column({ type: 'varchar', length: 255 })
  paymentMethod: 'CREDIT_CARD' | 'PIX' | 'PAYPAL';

  @Column({ type: 'varchar', length: 255 })
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @Column({type: 'varchar', length: 255 })
  transactionID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}