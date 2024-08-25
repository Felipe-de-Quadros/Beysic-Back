"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
class OrderRepository {
    static create(orderData) {
        const newOrder = Object.assign({ id: this.orders.length + 1, status: 'PENDING', createdAt: new Date(), updatedAt: new Date() }, orderData);
        this.orders.push(newOrder);
        return newOrder;
    }
    static update(orderId, updateData) {
        const orderIndex = this.orders.findIndex(order => order.id === orderId);
        if (orderIndex > -1) {
            this.orders[orderIndex] = Object.assign(Object.assign(Object.assign({}, this.orders[orderIndex]), updateData), { updatedAt: new Date() });
            return this.orders[orderIndex];
        }
        return null;
    }
    static findByID(orderId) {
        return this.orders.find(order => order.id === orderId);
    }
}
exports.OrderRepository = OrderRepository;
OrderRepository.orders = [];
