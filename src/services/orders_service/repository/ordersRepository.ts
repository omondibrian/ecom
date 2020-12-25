import { OrderEntity } from "../entity/orderEntity";

export interface IOrdersRepository {
  //to throw an error if update is not succesfull
  updateProductQty(
    payload: { productId: string; Qty: number }[]
  ): Promise<boolean>;
  //fixme:update the paymentDetails structure
  authenticatePayments(
    order: OrderEntity
  ): Promise<{ isPayed: boolean; PaymentDetails: any }>;
  getCustName(id: string): Promise<string>;
  genOrder(order: OrderEntity): Promise<OrderEntity>;
  getOrders(distributorId:string): Promise<OrderEntity[]>
}
