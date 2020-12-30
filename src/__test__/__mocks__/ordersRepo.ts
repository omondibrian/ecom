export class OrdersRepository implements OrderService.IOrdersRepository {
  getOrders(distributorId: string): Promise<OrderService.OrderEntity[]> {
    throw new Error("Method not implemented.");
  }
  genOrder(order: OrderService.OrderEntity): Promise<OrderService.OrderEntity> {
    throw new Error("Method not implemented.");
  }

  getCustName(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  authenticatePayments(
    order: OrderService.OrderEntity
  ): Promise<{ isPayed: boolean; PaymentDetails: any }> {
    throw new Error("Method not implemented.");
  }
  updateProductQty(
    payload: { productId: string; Qty: number }[]
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
