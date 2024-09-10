import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { ShopCart } from '../../shop-cart/entities/shop-cart.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity('shopcart_item')
export class ShopCartItem {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(() => ShopCart, (shopCart) => shopCart.items)
  shopCart?: ShopCart;

  @ManyToOne(() => Ticket)
  ticket?: Ticket;

  @Column({ type: 'int', default: 1 })
  quantity: number = 1;
}
