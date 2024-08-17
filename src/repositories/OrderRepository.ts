import { Order } from '../models/Order';

export class OrderRepository{
  private static orders: Order[] = [];

  public static create(orderData: Partial<Order>){
    const newOrder: Order = {
      id: this.orders.length + 1,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...orderData } as Order;

    this.orders.push(newOrder);
    return newOrder;
  }

  public static update(orderId: number, updateData: Partial<Order>){
    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex > -1){
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        ...updateData,
        updatedAt: new Date(),
      }
      return this.orders[orderIndex];
    }
    return null
  }

  public static findByID(orderId: number){
    return this.orders.find(order => order.id === orderId);
  }


}

