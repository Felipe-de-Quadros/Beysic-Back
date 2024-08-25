"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutesModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const PaymentController_1 = require("../controllers/PaymentController");
const PaymentService_1 = require("../services/PaymentService");
let PaymentRoutesModule = class PaymentRoutesModule {
};
exports.PaymentRoutesModule = PaymentRoutesModule;
exports.PaymentRoutesModule = PaymentRoutesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: 'payments',
                    module: PaymentRoutesModule,
                },
            ]),
        ],
        controllers: [PaymentController_1.PaymentController],
        providers: [PaymentService_1.PaymentService]
    })
], PaymentRoutesModule);
