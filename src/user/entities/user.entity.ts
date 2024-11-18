import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { ShopCart } from '../../shop-cart/entities/shop-cart.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: 'varchar', length: 100 })
  name: string = '';

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string = '';

  @Column({ type: 'varchar', length: 255 })
  password: string = '';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Column({ type: 'boolean', default: () => false })
  isProducer: boolean = false;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date = new Date();

  @OneToOne(() => ShopCart, { cascade: true })
  @JoinColumn()
  shopCart?: ShopCart;

  @OneToMany(() => Ticket, (ticket) => ticket.user, {cascade: true})
  tickets?: Ticket[];
}
