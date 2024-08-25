"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const OrderRepository_1 = require("../repositories/OrderRepository");
let PaymentService = class PaymentService {
    constructor() {
        this.payments = [];
    }
    createPayment(orderID, userID, paymentMethod, amount) {
        const order = OrderRepository_1.OrderRepository.findByID(orderID);
        if (!order || order.status !== 'PENDING') {
            throw new Error("Order not found or already paid");
        }
        const payment = {
            id: this.payments.length + 1,
            orderID,
            userID,
            amount,
            paymentMethod: paymentMethod,
            status: 'PENDING',
            transactionID: this.payments.length + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.payments.push(payment);
        return payment;
    }
    processPayment(payment) {
        //logica de processo de pagamento, estamos simulando que 20% dos pagamentos darão errado
        return Math.random() > 0.2;
    }
    getPaymentStatus(paymentID) {
        return this.payments.find(payment => payment.id === paymentID);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)()
], PaymentService);
