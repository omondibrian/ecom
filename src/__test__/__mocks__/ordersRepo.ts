import {
  OrderEntity,
  Receipt,
} from "../../services/orders_service/entity/orderEntity";
import { IOrdersRepository } from "../../services/orders_service/repository/ordersRepository";

export class OrdersRepository implements IOrdersRepository {
  getOrders(distributorId: string): Promise<OrderEntity[]> {
    throw new Error("Method not implemented.");
  }
  genOrder(order: OrderEntity): Promise<OrderEntity> {
    throw new Error("Method not implemented.");
  }

  getCustName(id: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  authenticatePayments(
    order: OrderEntity
  ): Promise<{ isPayed: boolean; PaymentDetails: any }> {
    throw new Error("Method not implemented.");
  }
  updateProductQty(
    payload: { productId: string; Qty: number }[]
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
