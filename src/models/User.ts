import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from './Ticket';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date = new Date();

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets?: Ticket[];
}
