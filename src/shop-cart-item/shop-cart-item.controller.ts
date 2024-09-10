import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopCartItemService } from './shop-cart-item.service';
import { CreateShopCartItemDto } from './dto/create-shop-cart-item.dto';
import { UpdateShopCartItemDto } from './dto/update-shop-cart-item.dto';

@Controller('shop-cart-item')
export class ShopCartItemController {
  constructor(private readonly shopCartItemService: ShopCartItemService) {}

  @Post()
  create(@Body() createShopCartItemDto: CreateShopCartItemDto) {
    return this.shopCartItemService.create(createShopCartItemDto);
  }

  @Get()
  findAll() {
    return this.shopCartItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopCartItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopCartItemDto: UpdateShopCartItemDto) {
    return this.shopCartItemService.update(+id, updateShopCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopCartItemService.remove(+id);
  }
}
