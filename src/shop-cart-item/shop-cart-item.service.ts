import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopCartItemDto } from './dto/create-shop-cart-item.dto';
import { UpdateShopCartItemDto } from './dto/update-shop-cart-item.dto';
import { ShopCartItemRepository } from './shop-cart-item.repository';

@Injectable()
export class ShopCartItemService {
  constructor(
    private readonly shopCartItemRepository: ShopCartItemRepository,
  ) {}

  async create(createShopCartItemDto: CreateShopCartItemDto) {
    return await this.shopCartItemRepository.create(createShopCartItemDto);
  }

  async findAll() {
    return this.shopCartItemRepository.findAll();
  }

  async findOne(id: number) {
    const item = await this.shopCartItemRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: number, updateShopCartItemDto: UpdateShopCartItemDto) {
    const item = await this.findOne(id);
    return this.shopCartItemRepository.update(id, { ...item, ...updateShopCartItemDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.shopCartItemRepository.remove(id);
    return { message: `Item with ID ${id} removed` };
  }
}
