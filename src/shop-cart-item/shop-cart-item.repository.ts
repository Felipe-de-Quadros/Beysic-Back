import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopCartItem } from './entities/shop-cart-item.entity';

@Injectable()
export class ShopCartItemRepository {
  constructor(
    @InjectRepository(ShopCartItem)
    private readonly shopCartItemRepository: Repository<ShopCartItem>,
  ) {}

  create(shopCartItemData: Partial<ShopCartItem>): Promise<ShopCartItem> {
    const newItem = this.shopCartItemRepository.create(shopCartItemData);
    return this.shopCartItemRepository.save(newItem);
  }

  findAll(): Promise<ShopCartItem[]> {
    return this.shopCartItemRepository.find();
  }

  findOne(id: number): Promise<ShopCartItem | null> {
    return this.shopCartItemRepository.findOne({ where: { id } });
  }

  update(id: number, updateData: Partial<ShopCartItem>): Promise<ShopCartItem> {
    return this.shopCartItemRepository.save({ id, ...updateData });
  }

  async remove(id: number): Promise<void> {
    await this.shopCartItemRepository.delete(id);
    return undefined;
  }
}
