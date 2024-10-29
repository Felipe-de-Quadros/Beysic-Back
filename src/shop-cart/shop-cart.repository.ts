import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopCart } from './entities/shop-cart.entity';

@Injectable()
export class ShopCartRepository {
  constructor(
    @InjectRepository(ShopCart)
    private readonly shopCartRepository: Repository<ShopCart>,
  ) {}

  public getAll() {
    return this.shopCartRepository.find({ relations: ['items', 'items.ticket', 'user'] });
  }

  public getById(id: number) {
    return this.shopCartRepository.findOne({
      where: { id },
      relations: ['items', 'items.ticket', 'user'],
    });
  }

  public getByUserId(userId: number) {
    return this.shopCartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.ticket', 'user'],
    });
  }

  public async create(cartData: Partial<ShopCart>) {
    const newCart = this.shopCartRepository.create(cartData);
    return await this.shopCartRepository.save(newCart);
  }

  public update(id: number, cartData: Partial<ShopCart>) {
    return this.shopCartRepository.save({ id, ...cartData });
  }

  public clearCart(userId: number) {
    return this.shopCartRepository.update({ user: { id: userId } }, { items: [] });
  }

  public delete(id: number) {
    return this.shopCartRepository.delete(id);
  }

  async save(cart: ShopCart) {
    return this.shopCartRepository.save(cart);
  }
}
