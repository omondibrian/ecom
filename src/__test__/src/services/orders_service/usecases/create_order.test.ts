import { CreateOrderUsecase } from "../../../../../services/orders_service/usecase/create_order";
import { OrdersRepository } from "../../../../__mocks__/ordersRepo";

const testRepo = new OrdersRepository();
const createOrder = new CreateOrderUsecase(testRepo);
describe("CreateOrderUsecase", () => {
  describe("CreateOrderUsecase.order", () => {
    const order: OrderService.OrderEntity = {
      _id: "023",
      cust_id: "24",
      productsList: [
        {
          _id: "1",
          name: "OrderedTestProduct",
          price: "$15",
          discount: "$3.0",
          distributor_id: "12",
          QtyToBeBought: 1,
          vat: 8.0,
        },
        {
          _id: "2",
          name: "OrderedTestProduct",
          price: "15",
          discount: "3.0",
          vat: 8.0,
          distributor_id: "2",
          QtyToBeBought: 2,
        },
      ],
    };
    beforeEach(() => {
      //setup mocks
      jest
        .spyOn(testRepo, "updateProductQty")
        .mockReturnValue(Promise.resolve(true));

      jest.spyOn(testRepo, "authenticatePayments").mockReturnValue(
        Promise.resolve({
          isPayed: true,
          PaymentDetails: { transcationId: "123" },
        })
      );
      jest
        .spyOn(testRepo, "getCustName")
        .mockReturnValue(Promise.resolve("testCustomer"));
      jest
        .spyOn(testRepo, "genOrder")
        .mockReturnValue(Promise.resolve({ ...order, name: "testCustomer" }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should succesfully authenticate payments to validate the given order", async () => {
      await createOrder.order(order);
      expect(testRepo.authenticatePayments).toHaveBeenCalledWith(order);
      expect(testRepo.authenticatePayments).toHaveReturned();
    });

    it("should not call UpdateProductQty if payments is not validated ", async () => {
      //setup mocks
      jest.spyOn(testRepo, "authenticatePayments").mockReturnValue(
        Promise.resolve({
          isPayed: false,
          PaymentDetails: { transcationId: "123" },
        })
      );
      await createOrder.order(order);
      expect(testRepo.updateProductQty).toHaveBeenCalledTimes(0);
    });

    it("should sucessfully update the Qty of the available products", async () => {
      await createOrder.order(order);
      expect(testRepo.updateProductQty).toHaveBeenCalledWith([
        { productId: "1", Qty: 1 },
        { productId: "2", Qty: 2 },
      ]);
      expect(testRepo.updateProductQty).toHaveReturned();
    });

    it("should succesfully create a new Order", async () => {
      const result = await createOrder.order(order);
      expect(result).toStrictEqual<OrderService.Receipt>({
        ...order,
        name: "testCustomer",
      });
    });
  });
});
