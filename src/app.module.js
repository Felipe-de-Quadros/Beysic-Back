"use strict";
import { ShopCartModule } from './shop-cart/shop-cart.module';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ShopCartItemModule } from './shop-cart-item/shop-cart-item.module';
import { AuthModule } from './auth/auth.module';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const TicketRoutes_1 = require("./routes/TicketRoutes");
const PaymentRoutes_1 = require("./routes/PaymentRoutes");
const typeorm_1 = require("@nestjs/typeorm");
const Payment_1 = require("./models/Payment");
const Order_1 = require("./models/Order");
const Ticket_1 = require("./models/Ticket");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'tales',
                password: 'Masterkey',
                database: 'beysic',
                entities: [Ticket_1.Ticket, Order_1.Order, Payment_1.Payment],
                synchronize: false, // quando usar migrations, botar pra FALSE
            }),
            typeorm_1.TypeOrmModule.forFeature([Ticket_1.Ticket, Order_1.Order, Payment_1.Payment]),
            TicketRoutes_1.TicketRoutesModule,
            PaymentRoutes_1.PaymentRoutesModule
        ],
    })
], AppModule);
