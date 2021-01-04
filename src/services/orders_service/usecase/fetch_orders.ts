export class FetchOrdersUsecase {
  constructor(private readonly repository: OrderService.IOrdersRepository) {}
  async fetch(distributorID: string): Promise<OrderService.OrderEntity[]> {
    const result = await this.repository.getOrders(distributorID);
    return result;
  }
}
