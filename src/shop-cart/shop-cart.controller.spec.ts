import { Test, TestingModule } from '@nestjs/testing';
import { ShopCartController } from './shop-cart.controller';
import { ShopCartService } from './shop-cart.service';

describe('ShopCartController', () => {
  let controller: ShopCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopCartController],
      providers: [ShopCartService],
    }).compile();

    controller = module.get<ShopCartController>(ShopCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
