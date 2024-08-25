import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  ticketID: number = 0;

  @Column()
  userID: number = 0;

  @Column({ type: 'enum', enum: ['PENDING', 'PAID', 'CANCELLED'], default: 'PENDING' })
  status: 'PENDING' | 'PAID' | 'CANCELLED' = 'PENDING';

  @Column({ type: 'int' })
  quantity: number = 0;

  @Column({type: 'decimal' })
  totalAmount: number = 0.0;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date = new Date();
}