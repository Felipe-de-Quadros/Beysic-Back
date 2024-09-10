import { Module } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { ShopCartController } from './shop-cart.controller';
import { ShopCartRepository } from './shop-cart.repository';
import { ShopCart } from './entities/shop-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopCartItemRepository } from '../shop-cart-item/shop-cart-item.repository';
import { TicketModule } from '../ticket/ticket.module';
import { ShopCartItem } from '../shop-cart-item/entities/shop-cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopCart, ShopCartItem]),
    TicketModule
  ],
  providers: [ShopCartService, ShopCartRepository, ShopCartItemRepository],
  controllers: [ShopCartController],
  exports: [ShopCartRepository],
})
export class ShopCartModule {}
