import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ShopCartItem } from '../../shop-cart-item/entities/shop-cart-item.entity';

@Entity('shopcart')
export class ShopCart {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @ManyToOne(() => User, (user) => user.shopCart)
  @JoinColumn()
  user?: User;

  @OneToMany(() => ShopCartItem, (item) => item.shopCart, { cascade: true })
  items?: ShopCartItem[];
}
