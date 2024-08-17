import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PaymentController } from '../controllers/PaymentController';
import { PaymentService } from '../services/PaymentService';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'payments',
        module: PaymentRoutesModule,
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentRoutesModule {}