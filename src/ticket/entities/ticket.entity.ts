import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('ticket')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({type: 'varchar', length: 255})
  eventName: string = '';

  @Column({ type: 'simple-array' })
  categories: string[] = [];

  @Column({type: 'varchar', length: 255})
  place: string = '';

  @Column({type: 'varchar', length: 255})
  city: string = '';

  @Column({type: 'varchar', length: 2})
  state: string = '';

  @Column({type: 'decimal' })
  price: number = 0.0;

  @Column({type: 'int' })
  availableQuantity: number = 0;

  @ManyToOne(() => User, (user) => user.tickets)
  user?: User ;
}