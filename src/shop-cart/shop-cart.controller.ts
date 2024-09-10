import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';

@Controller('shop-cart')
export class ShopCartController {
  constructor(private readonly shopCartService: ShopCartService) {}

  @Get(':userID')
  getCart(@Param('userID') userId: number) {
    return this.shopCartService.getCart(userId);
  }

  @Post(':userID/add')
  addToCart(
    @Param('userID') userId: number,
    @Body() body: { ticketId: number; quantity: number },
  ) {
    return this.shopCartService.addToCart(userId, body.ticketId, body.quantity);
  }

  @Delete(':userID/remove/:ticketID')
  removeFromCart(
    @Param('userID') userId: number,
    @Param('ticketID') ticketId: number,
  ) {
    return this.shopCartService.removeFromCart(userId, ticketId);
  }

  @Delete(':userID/clear')
  clearCart(@Param('userID') userId: number) {
    return this.shopCartService.clearCart(userId);
  }
}
