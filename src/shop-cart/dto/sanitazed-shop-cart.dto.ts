export class SanitizedShopCartDto {
  id!: number;
  userId!: number;
  items!: {
    id: number;
    ticket: {
      id: number;
      eventName: string;
      price: number;
      availableQuantity: number;
    };
    quantity: number;
  }[];
}
