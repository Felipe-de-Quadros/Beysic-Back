import { Test, TestingModule } from '@nestjs/testing';
import { ShopCartItemController } from './shop-cart-item.controller';
import { ShopCartItemService } from './shop-cart-item.service';

describe('ShopCartItemController', () => {
  let controller: ShopCartItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopCartItemController],
      providers: [ShopCartItemService],
    }).compile();

    controller = module.get<ShopCartItemController>(ShopCartItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
