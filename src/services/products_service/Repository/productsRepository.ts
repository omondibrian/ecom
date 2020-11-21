import { IproductEntity } from "./../entity/productEntity";
export interface IProductRepository {
  findProduct(searchParam: string): Promise<IproductEntity>;
}
