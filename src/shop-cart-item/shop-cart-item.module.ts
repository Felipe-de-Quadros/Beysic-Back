import { Module } from '@nestjs/common';
import { ShopCart } from '../shop-cart/entities/shop-cart.entity';
import { ShopCartItem } from './entities/shop-cart-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopCartItemRepository } from './shop-cart-item.repository';
import { TicketModule } from '../ticket/ticket.module';
import { ShopCartItemService } from './shop-cart-item.service';
import { ShopCartItemController } from './shop-cart-item.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopCart, ShopCartItem]),
    TicketModule,
  ],
  providers: [ShopCartItemService, ShopCartItemRepository, ShopCartItemRepository],
  controllers: [ShopCartItemController],
  exports: [ShopCartItemRepository],
})
export class ShopCartItemModule {}
