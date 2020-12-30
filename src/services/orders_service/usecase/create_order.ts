
export class CreateOrderUsecase {
  constructor(private readonly repository: OrderService.IOrdersRepository) {}

  async order(order: OrderService.OrderEntity): Promise<OrderService.Receipt> {
    const isAuthorisedPayment = await this.repository.authenticatePayments(
      order
    );
    if (isAuthorisedPayment.isPayed) {
      const productArr = order.productsList;
      let payload: Array<{ productId: string; Qty: number }> = this.genPayload(
        productArr
      );
      await this.repository.updateProductQty(payload);
      //TODO:check if delevry address is set
      const [cust_name, result] = await Promise.all([
        this.repository.getCustName(order.cust_id),
        this.repository.genOrder(order),
      ]);

      const receipt:OrderService.Receipt = {
        ...result,
        name: cust_name,
      };
      return receipt;
    }
  }

  private genPayload(
    productArr: {
      _id: string;
      name: string;
      price: string;
      discount: string;
      vat:number;
      distributor_id: string;
      QtyToBeBought: number;
    }[]
  ) {
    let payload: Array<{ productId: string; Qty: number }> = [];
    //O(n)
    let prodLen = productArr.length;
    for (let prodIndex = 0; prodIndex < prodLen; prodIndex++) {
      const Qty = productArr[prodIndex].QtyToBeBought;
      const productId = productArr[prodIndex]._id;
      let field = { productId, Qty };
      payload.push(field);
    }
    return payload;
  }
}
