import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticketID: number;

  @Column()
  userID: number;

  @Column({type : 'varchar', length: 255})
  status: 'PENDING' | 'PAID' | 'CANCELLED';

  @Column({ type: 'int' })
  quantity: number;

  @Column({type: 'decimal' })
  totalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}