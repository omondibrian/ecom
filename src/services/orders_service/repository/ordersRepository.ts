import { MaybeCompositeId } from "objection";
import Product from "../../products_service/Repository/models/products.model";
import Order from "./models/order.model";
import OrderedProduct from "./models/orderedProducts.model";
import Transcation from "./models/transcation.model";

type prodList = {
  name: string;
  QtyToBeBought: number;
  price: string;
  distributor_id: string;
  discount: string;
  vat: number;
  _id: string;
}[];

export class OrdersRepository implements OrderService.IOrdersRepository {
  constructor(
    private readonly userRepo: UsersService.IUserRepository,
    private readonly productRepo: ProductsService.IProductRepository
  ) {}

  async updateProductQty(
    payload: { productId: string; Qty: number }[]
  ): Promise<boolean> {
    const updates = payload.map(async (product) => {
      const result = await this.productRepo.updateProductQty({
        _id: parseInt(product.productId),
        qty: product.Qty,
      });
      return result;
    });
    return payload.length === updates.length;
  }
  async authenticatePayments(
    order: OrderService.OrderEntity
  ): Promise<{ isPayed: boolean; PaymentDetails: any }> {
    //TODO:add an actual payment gateway
    return order && { isPayed: true, PaymentDetails: { transcationId: "123" } };
  }
  async getCustName(id: string): Promise<string> {
    const user = await this.userRepo.findUser({ _id: id });
    return user.name;
  }
  async genOrder(
    order: OrderService.OrderEntity
  ): Promise<OrderService.OrderEntity> {
    const { cust_id, productsList } = order;
    let amount: number = 0;
    let products: {
      product_id: number;
      order_id: number;
      QtyToBeBought: number;
    }[] = [];
    for (let i = 0; i < productsList.length; i++) {
      const product = productsList[i];
      amount +=
        product.QtyToBeBought *
        (parseFloat(product.price) +
          (product.vat / 100) * parseFloat(product.price) -
          parseFloat(product.discount));
    }

    const TransID = await Transcation.query().insertAndFetch({
      user_id: parseInt(cust_id),
      Amount: Math.trunc(amount),
    });
    const savedOrder = await Order.query().insertAndFetch({
      cust_id: parseInt(cust_id),
      status: "inprogress",
      transcation_id: TransID._id,
    });
    for (let i = 0; i < productsList.length; i++) {
      const product = productsList[i];
      products[i] = {
        QtyToBeBought: product.QtyToBeBought,
        product_id: parseInt(product._id as string),
        order_id: parseInt(savedOrder._id),
      };
    }

    const ordProdId = await OrderedProduct.query().insert(products);
    console.log(ordProdId);
    const orderedProdDetails = ordProdId.map((prod) => {
      return this.productRepo.findProduct(prod._id);
    });
    const prodDetails = await Promise.all(orderedProdDetails);
    let list: {
      _id: string;
      name: string;
      price: string;
      discount: string;
      vat: number;
      distributor_id: string;
      QtyToBeBought: number;
    };
    for (let prodIndex = 0; prodIndex < ordProdId.length; prodIndex++) {
      const orderPro = ordProdId[prodIndex];
      const details = prodDetails[prodIndex];
      list = {
        _id: details._id + "",
        name: details.name,
        price: details.price,
        discount: details.discount,
        vat: details.vat,
        distributor_id: details.distributor_id,
        QtyToBeBought: orderPro.QtyToBeBought,
      };
      productsList[prodIndex] = list;
    }
    return {
      cust_id: savedOrder.cust_id + "",
      productsList,
    };
  }
  async getOrders(distributorId: string): Promise<OrderService.OrderEntity[]> {
    // let orderEntity: OrderService.OrderEntity[];
    // let order: Order;
    let prodLists: Array<{
      name: string;
      QtyToBeBought: number;
      price: string;
      distributor_id: string;
      discount: string;
      vat: number;
      _id: string;
    }> = [];
    const orderedProd = await this.genOrderedProducts(distributorId);
    const orders = await this.genOrders(orderedProd);
    for (let i = 0; i < orderedProd.length; i++) {
      const prod = orderedProd[i];
      const list = await this.genProdList(distributorId, prod);
      prodLists = [...list, ...prodLists];
    }

    //return the orders
    return this.returnOrders(orders, prodLists);
  }

  private async genOrders(orderedProducts: OrderedProduct[]) {
    const orders = orderedProducts.map(async (orderedProduct) => {
      const order = await Order.query().findById(orderedProduct.order_id);
      return order;
    });
    const result = await Promise.all(orders);
    let uniqueOrders = result.filter((c, index) => {
      return result.indexOf(c) === index;
    });
    return uniqueOrders;
  }

  private async genProdList(
    distributorId: string,
    orderedProd: OrderedProduct
  ) {
    //retrive the product ids with the distributor_id
    const products = await this.genOrderedProducts(distributorId);
    let productsList: Array<{
      name: string;
      QtyToBeBought: number;
      price: string;
      distributor_id: string;
      discount: string;
      vat: number;
      _id: string;
    }> = [];

    for (let prodIndex = 0; prodIndex < products.length; prodIndex++) {
      const product = products[prodIndex];

      productsList[prodIndex] = {
        name: product.name,
        QtyToBeBought: orderedProd.QtyToBeBought,
        price: product.price + "",
        distributor_id: product.distributor_id + "",
        discount: product.discount + "",
        vat: product.vat,
        _id: product._id + "",
      };
    }

    return productsList;
  }

  private async genOrderedProducts(distributorId: string) {
    let orderedProd: Array<OrderedProduct> = [];
    const prods = await Product.query()
      .select("*")
      .where({ distributor_id: distributorId });
    for (let i = 0; i < prods.length; i++) {
      const prod = prods[i];
      let orderedProduct: OrderedProduct;
      if (prod.id !== undefined) {
        orderedProduct = await OrderedProduct.query().findById(
          prod._id as MaybeCompositeId
        );
        if (orderedProduct.name === "undefined") continue;
        orderedProd = [...orderedProd, orderedProduct];
      }
      // const orderedProduct = await OrderedProduct.query()
      //   .select("*")
      //   .where({ _id: prod._id });
    }
    return orderedProd;
  }

  private returnOrders(orders: Order[], prodList: prodList) {
    let orderEntity: OrderService.OrderEntity[] = [];
    for (let j = 0; j < orders.length; j++) {
      //retrive the order
      const order = orders[j];
      orderEntity[j] = {
        cust_id: order.cust_id + "",
        productsList: prodList,
      };
    }
    return orderEntity;
  }
}
