import { PartialType } from '@nestjs/mapped-types';
import { CreateShopCartItemDto } from './create-shop-cart-item.dto';

export class UpdateShopCartItemDto extends PartialType(CreateShopCartItemDto) {}
