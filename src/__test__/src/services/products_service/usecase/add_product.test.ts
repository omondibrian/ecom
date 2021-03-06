import { AddProductUsecase } from "../../../../../services/products_service/usecases/add_product";
import { ProductsTestRepository } from "../../../../__mocks__/productsRepo";

const testRepo = new ProductsTestRepository();
const addProductUsecase = new AddProductUsecase(testRepo);

describe("AddProductUsecase", () => {
  describe("AddProductUsecase.add()", () => {
    const product: ProductsService.IproductEntity = {
      name: "testProduct",
      Qty: 12,
      price: "$12",
      discount: "$2.0",
      distributor_id: "12",
      _id: "1",
      vat: 8,
    };
    beforeAll(() => {
      jest.spyOn(testRepo, "addProduct");

      jest
        .spyOn(testRepo, "updateProduct")
        .mockImplementation(async (product) => {
          return {
            name: "testProduct",
            Qty: product.fields.Qty,
            price: "$12",
            discount: "$2.0",
            distributor_id: "12",
            _id: "1",
            vat: 8,
          };
        });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should successfully add new Product", async () => {
      //setup mocks
      jest
        .spyOn(testRepo, "addProduct")
        .mockReturnValue(new Promise((res, _) => res(product)));
      const result = await addProductUsecase.add(product);

      expect(result).toStrictEqual(product);
      expect(testRepo.addProduct).toHaveBeenCalled();
    });
    it("should successfully increament product Qty if it already exist", async () => {
      //setup mocks
      jest
        .spyOn(testRepo, "findProduct")
        .mockReturnValue(new Promise((res, _) => res(product)));

      const result = await addProductUsecase.add(product);

      expect(result).toStrictEqual({ ...product, Qty: 24 });
      expect(testRepo.updateProduct).toHaveBeenCalled();
    });
  });
});
