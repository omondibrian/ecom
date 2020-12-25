import { FetchOrdersUsecase } from "../../../../../services/orders_service/usecase/fetch_orders";
import { OrdersRepository } from "../../../../__mocks__/ordersRepo";
import { ordersList } from "../../../../__mocks__/ordersStubs";
const testRepo = new OrdersRepository();
const fetchOrders = new FetchOrdersUsecase(testRepo);
describe("FetchOrdersUsecase", () => {
  describe("FetchOrdersUsecase.fetchOrders", () => {
    beforeEach(() => {
      jest.spyOn(testRepo, "getOrders").mockResolvedValue(ordersList);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    
    it("should successfully fetch disributor's orders", async () => {
      const distributorID = "12";
      const result = await fetchOrders.fetch(distributorID);
      expect(result).toStrictEqual(ordersList);
      expect(testRepo.getOrders).toHaveBeenCalledWith(distributorID);
    });
  });
});
