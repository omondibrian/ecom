import { IproductEntity } from "../../services/products_service/entity/productEntity";
import { IProductRepository } from "../../services/products_service/Repository/productsRepository";

export class ProductsTestRepository implements IProductRepository {
  updateProduct(payload: { productId: string; fields: { key: string; value: string; }[]; }): Promise<IproductEntity> {
      throw new Error("Method not implemented.");
  }
  findAll(): Promise<IproductEntity[]> {
    throw new Error("Method not implemented.");
  }
 
  addProduct(searchParam: IproductEntity): Promise<IproductEntity> {
    throw new Error("Method not implemented.");
  }

  findProduct(searchParam: string): Promise<IproductEntity> {
    return null;
  }
}
