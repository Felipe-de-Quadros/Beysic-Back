import { Module, forwardRef } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { ShopCartController } from './shop-cart.controller';
import { ShopCartRepository } from './shop-cart.repository';
import { ShopCart } from './entities/shop-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopCartItemRepository } from '../shop-cart-item/shop-cart-item.repository';
import { TicketModule } from '../ticket/ticket.module';
import { ShopCartItem } from '../shop-cart-item/entities/shop-cart-item.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopCart, ShopCartItem]),
    forwardRef(()=>TicketModule),
    forwardRef(()=>UserModule)
  ],
  providers: [ShopCartService, ShopCartRepository, ShopCartItemRepository],
  controllers: [ShopCartController],
  exports: [ShopCartRepository, ShopCartService],
})
export class ShopCartModule {}
