import { Injectable, NotFoundException } from '@nestjs/common';
import { ShopCart } from './entities/shop-cart.entity';
import { ShopCartItem } from '../shop-cart-item/entities/shop-cart-item.entity';
import { TicketRepository } from '../ticket/ticket.repository';
import { ShopCartRepository } from './shop-cart.repository';
import { ShopCartItemRepository } from '../shop-cart-item/shop-cart-item.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class ShopCartService {
  constructor(
    private readonly shopCartRepository: ShopCartRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly shopCartItemRepository: ShopCartItemRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createCartToUserId(userId: number): Promise<ShopCart> {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }
    if (user.shopCart) {
      return user.shopCart;
    }
    const newCart = await this.shopCartRepository.create({
      user: user
    });

    return await this.shopCartRepository.save(newCart);
  }

  async getCart(userId: number): Promise<ShopCart | null> {
    const result = await this.shopCartRepository.getById(userId);

    if (!result) {
      await this.createCartToUserId(userId) ;
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
