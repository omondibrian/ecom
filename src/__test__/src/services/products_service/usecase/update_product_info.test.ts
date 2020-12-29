import { UpdateProductInfo } from "../../../../../services/products_service/usecases/update_product_info";
import { ProductsTestRepository } from "../../../../__mocks__/productsRepo";

const testRepo = new ProductsTestRepository();
const updateProductInfo = new UpdateProductInfo(testRepo);

describe("UpdateProductInfo", () => {
  describe("UpdateProductInfo.updateProduct", () => {
    beforeAll(() => {
      jest
        .spyOn(testRepo, "updateProduct")
        .mockImplementation(async () => {
          return {
            _id: "1",
            name: "updatedTestProduct",
            price: "15",
            discount: "3.0",
            vat:80,
            distributor_id: "12",
            Qty: 12,
          };
        });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should succesfully update product info", async () => {
      const updatedProduct = await updateProductInfo.updateProduct({
        _id: "1",
        updatedFields: {
          name: "updatedTestProduct",
          price: "15",
          discount: "3.0",
         vat:8
        },
      });

      expect(updatedProduct).toStrictEqual({
        _id: "1",
        name: "updatedTestProduct",
        price: "15",
        discount: "3.0",
        vat:8.0,
        distributor_id: "12",
        Qty: 12,
      });
      expect(testRepo.updateProduct).toHaveBeenCalled();
    });
  });


});
