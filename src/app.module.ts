import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ShopCartModule } from './shop-cart/shop-cart.module';
import { ShopCartItemModule } from './shop-cart-item/shop-cart-item.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    OrderModule,
    PaymentModule,
    ShopCartModule,
    ShopCartItemModule,
    TicketModule,
    UserModule,
  ],
})
export class AppModule {}
