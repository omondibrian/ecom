import { OrderEntity } from "../entity/orderEntity";
import { IOrdersRepository } from "../repository/ordersRepository";

export class FetchOrdersUsecase {
  constructor(private readonly repository: IOrdersRepository) {}
  async fetch(distributorID: string): Promise<OrderEntity[]> {
    const result = await this.repository.getOrders(distributorID);
    return result;
  }
}
