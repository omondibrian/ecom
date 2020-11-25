import { DeleteProductInfo } from "../../../../services/products_service/usecases/delete_product_usecase";
import { ProductsTestRepository } from "../../../__mocks__/productsRepo";

const testRepo = new ProductsTestRepository();
const deleteProductInfo = new DeleteProductInfo(testRepo);

describe("DeleteProductInfo", () => {
  describe("DeleteProductInfo.deleteProduct", () => {
    beforeAll(() => {
      jest.spyOn(testRepo, "deleteProduct").mockImplementation(async (id) => {
        return {
          deletedProduct: {
            _id: "1",
            name: "updatedTestProduct",
            price: "$15",
            discount: "$3.0",
            productPic: "/updatedPath",
            distributor_id: "12",
            Qty: 12,
          },
          deleted: true,
        };
      });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should succesfully deleted the selected product", async () => {
      const productId = "1";
      const deletedProduct = await deleteProductInfo.deleteProduct(productId);

      expect(deletedProduct).toStrictEqual({
        deletedProduct: {
          _id: "1",
          name: "updatedTestProduct",
          price: "$15",
          discount: "$3.0",
          productPic: "/updatedPath",
          distributor_id: "12",
          Qty: 12,
        },
        deleted: true,
      });
      expect(testRepo.deleteProduct).toHaveBeenCalled();
    });
  });
});
