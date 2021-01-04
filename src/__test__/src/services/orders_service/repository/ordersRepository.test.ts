import Order from "../../../../../services/orders_service/repository/models/order.model";
import OrderedProduct from "../../../../../services/orders_service/repository/models/orderedProducts.model";
import { OrdersRepository } from "../../../../../services/orders_service/repository/ordersRepository";
import Product from "../../../../../services/products_service/Repository/models/products.model";
import { ProductsRepository } from "../../../../../services/products_service/Repository/productsRepository";
import UsersServiceRepository from "../../../../../services/users_service/service_repository";
import { ordersList } from "../../../../__mocks__/ordersStubs";

describe("Orders Repository", () => {
  const userRepo = new UsersServiceRepository();
  const productRepo = new ProductsRepository();
  const repository = new OrdersRepository(userRepo, productRepo);
  afterAll(() => {
    Order.knex().destroy();
    OrderedProduct.knex().destroy();
    Product.knex().destroy();
  });
  describe("OrdersRepository.getCustName()", () => {
    it("should successfullly return a valid user string", async () => {
      const custID = "1";
      const result = await repository.getCustName(custID);
      expect(result).toBe<string>("testUser");
    });
  });
  describe("OrderRepository.updateProductQty", () => {
    it("should update product quantity", async () => {
      const isUpdated = await repository.updateProductQty([
        { productId: "1", Qty: 2 },
      ]);
      expect(isUpdated).toBeTruthy();
    });
  });

  describe("OrderRepository.authenticatePayments", () => {
    it("should verify successfull payment", async () => {
      const isAuthPayment = await repository.authenticatePayments(
        ordersList[0]
      );
      expect(isAuthPayment.isPayed).toBeTruthy();
    });
  });

  describe("OrderRepository.genOrder()", () => {
    const order: OrderService.OrderEntity = {
      cust_id: "24",
      productsList: [
        {
          name: "OrderedTestProduct",
          price: "15",
          discount: "3.0",
          distributor_id: "1",
          QtyToBeBought: 1,
          vat: 8.0,
          _id: "1",
        },
        {
          name: "OrderedTestProduct",
          price: "15",
          discount: "3.0",
          vat: 8.0,
          distributor_id: "1",
          QtyToBeBought: 2,
          _id: "2",
           
        },
      ],
    };

    it("should insert and return the inserted order", async () => {
      const result = await repository.genOrder(order);
      expect(result).toStrictEqual({ ...order });
    });
  });

  describe("OrderRepository.getOrder()",()=>{
    // const order: OrderService.OrderEntity = {
    //   cust_id: "24",
    //   productsList: [
    //     {
    //       name: "OrderedTestProduct",
    //       price: "15",
    //       discount: "3.0",
    //       distributor_id: "1",
    //       QtyToBeBought: 1,
    //       vat: 8.0,
    //       _id: "1",
    //     },
    //     {
    //       name: "OrderedTestProduct",
    //       price: "15",
    //       discount: "3.0",
    //       vat: 8.0,
    //       distributor_id: "1",
    //       QtyToBeBought: 2,
    //       _id: "2",
    //     },
    //   ],
    // };
    it('should return the requested orders',async()=>{
      const distributorId = '1';
      const result = await repository.getOrders(distributorId);
      expect(result).toBeDefined()
    })
  })
});
