import { Test, TestingModule } from '@nestjs/testing';
import { ShopCartItemService } from './shop-cart-item.service';

describe('ShopCartItemService', () => {
  let service: ShopCartItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopCartItemService],
    }).compile();

    service = module.get<ShopCartItemService>(ShopCartItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
