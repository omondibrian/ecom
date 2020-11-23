import { IproductEntity } from "./../entity/productEntity";
export interface IProductRepository {
  findProduct(searchParam: string): Promise<IproductEntity>;
  findAll(): Promise<IproductEntity[]>;
  addProduct(searchParam: IproductEntity): Promise<IproductEntity>;
  updateProduct(payload: {
    productId: string;
    fields:Array<{key:string,value:string}>;
  }): Promise<IproductEntity>;
}
