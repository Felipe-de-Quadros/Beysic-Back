export class Payment {
  id: number;
  orderID: number;
  userID: number;
  amount: number;
  paymentMethod: 'CREDIT_CARD' | 'PIX' | 'PAYPAL';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  transactionID: number;
  createdAt: Date;
  updatedAt: Date;
}