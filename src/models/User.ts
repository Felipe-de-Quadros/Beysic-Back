import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Nome da tabela no banco de dados
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column({ type: 'varchar', length: 100 })
  name: string = '';

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string = '';

  @Column({ type: 'varchar', length: 255 })
  password: string = '';

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date = new Date();
}
