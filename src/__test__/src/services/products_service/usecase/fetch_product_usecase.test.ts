import { IproductEntity } from "./../../../../../services/products_service/entity/productEntity";
import { FetchProductUsecase } from "../../../../../services/products_service/usecases/fetch_product_usecase";
import { ProductsTestRepository } from "../../../../__mocks__/productsRepo";

const testRepo = new ProductsTestRepository();
const fetchProductUsecase = new FetchProductUsecase(testRepo);

describe("FetchProductUsecase", () => {
  const product: IproductEntity = {
    name: "testProduct",
    Qty: 12,
    price: "$12",
    discount:'$2.0',
    distributor_id: "12",
    productPic:"/picture",
    _id: "1",
  };
  describe("FetchProductUsecase.fetch", () => {
    //setup
    beforeAll(() => {
      jest
        .spyOn(testRepo, "findProduct")
        .mockReturnValue(new Promise((res, _) => res(product)));
    });
    //tearDown
    afterAll(() => {
      jest.clearAllMocks();
    });

    it("should throw TypeError when no param is passed", () => {
      expect(() => fetchProductUsecase.find({})).rejects.toThrowError(
        new TypeError("no identity param passed")
      );
    });

    it("should fetch a product when passed the correct _id", async () => {
      const result = await fetchProductUsecase.find({ _id: product._id });
      expect(result).toEqual(product);
      expect(testRepo.findProduct).toHaveBeenCalled();
    });

    it("should fetch a product when passed the correct name", async () => {
      const result = await fetchProductUsecase.find({ name: product.name });
      expect(result).toEqual(product);
      expect(testRepo.findProduct).toHaveBeenCalled();
    });
  });

  describe("FetchProductUsecase.fetchAll", () => {
    const productArr = [{ ...product }, { ...product }];
    //setup
    beforeAll(() => {
      jest.spyOn(testRepo, "findAll").mockImplementation(async () => {
        return productArr;
      });
    });
    //tearDown
    afterAll(() => {
      jest.clearAllMocks();
    });
    it("should fetch all available products", async () => {
      const result = await fetchProductUsecase.fetchAllProducts();
      expect(result).toStrictEqual<Array<IproductEntity>>([product, product]);
      expect(testRepo.findAll).toHaveBeenCalled()
    });
  });
});
