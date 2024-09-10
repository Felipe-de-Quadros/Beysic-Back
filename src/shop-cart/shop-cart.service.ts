import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopCart } from './entities/shop-cart.entity';
import { ShopCartItem } from '../shop-cart-item/entities/shop-cart-item.entity';
import { TicketRepository } from '../ticket/ticket.repository';
import { ShopCartRepository } from './shop-cart.repository';
import { ShopCartItemRepository } from '../shop-cart-item/shop-cart-item.repository';

@Injectable()
export class ShopCartService {
  constructor(
    private readonly shopCartRepository: ShopCartRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly shopCartItemRepository: ShopCartItemRepository,
  ) {}

  async getCart(userId: number): Promise<ShopCart | null> {
    const result = await this.shopCartRepository.getById(userId);

    if (!result) {
      return null;
    }

    return result;
  }


  async addToCart(userId: number, ticketId: number, quantity: number): Promise<ShopCart> {
    const cart = await this.getCart(userId);
    const ticket = await this.ticketRepository.getById(ticketId);

    if (!cart || !ticket) {
      throw new NotFoundException('Carrinho ou ticket não encontrado');
    }

    if (!cart.items) {
      cart.items = [];
    }

    const existingItem = cart.items.find(item => item.ticket && item.ticket.id === ticketId);
    if (existingItem) {
      existingItem.quantity += quantity;
      await this.shopCartItemRepository.create(existingItem);
    } else {
      const newItem = new ShopCartItem();
      newItem.shopCart = cart;
      newItem.ticket = ticket;
      newItem.quantity = quantity;
      await this.shopCartItemRepository.create(newItem);
    }

    return this.shopCartRepository.save(cart);
  }


  async removeFromCart(userId: number, ticketId: number): Promise<ShopCart> {
    const cart = await this.getCart(userId);

    if (!cart || !cart.items) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    cart.items = cart.items.filter(item => item.ticket && item.ticket.id !== ticketId);
    return this.shopCartRepository.save(cart);
  }


  async clearCart(userId: number): Promise<ShopCart> {
    const cart = await this.getCart(userId);

    if (!cart || !cart.items) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    cart.items = [];
    return this.shopCartRepository.save(cart);
  }
}
