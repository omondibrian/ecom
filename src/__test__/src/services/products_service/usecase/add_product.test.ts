import { IproductEntity } from "../../../../../services/products_service/entity/productEntity";
import { IProductRepository } from "../../../../../services/products_service/Repository/productsRepository";

class ProductsTestRepository implements IProductRepository {}
class AddProductUsecase {
  constructor(private readonly repository: IProductRepository) {}
  add(product: IproductEntity): Promise<IproductEntity> {}
}
const testRepo = new ProductsTestRepository();
const addProductUsecase = new AddProductUsecase(testRepo);
describe("AddProductUsecase", () => {
  describe("AddProductUsecase.add()", () => {
    it("should successfully add new Product", async () => {
      const product: IproductEntity = {
        name: "testProduct",
        Qty: "12",
        price: "$12",
        distributor_id: "12",
      };
	  const result = await addProductUsecase.add(product);
	  const Product = await testRepo.findProduct(product.name)
    });
    it("should successfully increament product Qty if it already exist", () => {});
  });
});
