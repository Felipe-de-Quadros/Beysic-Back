"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const OrderRepository_1 = require("../repositories/OrderRepository");
const PaymentRepository_1 = require("../repositories/PaymentRepository");
let PaymentService = class PaymentService {
    constructor(orderRepository, paymentRepository) {
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
    }
    createPayment(orderID, userID, paymentMethod, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderRepository.getById(orderID);
            if (!order || order.status !== 'PENDING') {
                throw new Error('Order not found or already paid');
            }
            const payment = {
                orderID,
                userID,
                amount,
                paymentMethod: paymentMethod,
                status: 'PENDING',
                transactionID: this.generateTransactionID(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const newPayment = yield this.paymentRepository.create(payment);
            const isPaymentSuccessful = this.processPayment(newPayment);
            if (isPaymentSuccessful) {
                yield this.paymentRepository.update(newPayment.id, { status: 'COMPLETED' });
                return newPayment;
            }
            else {
                yield this.paymentRepository.update(newPayment.id, { status: 'FAILED' });
                throw new Error('Payment processing failed');
            }
        });
    }
    processPayment(payment) {
        return Math.random() > 0.2;
    }
    getPaymentStatus(paymentID) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.paymentRepository.getById(paymentID);
        });
    }
    generateTransactionID() {
        return Math.floor(Math.random() * 1000000);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [OrderRepository_1.OrderRepository,
        PaymentRepository_1.PaymentRepository])
], PaymentService);
