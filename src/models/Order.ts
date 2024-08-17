export class Order {
  id: number;
  ticketID: number;
  userID: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  quantity: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}