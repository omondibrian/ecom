import { IproductEntity } from "./../entity/productEntity";
import { IProductRepository } from "../Repository/productsRepository";

export class FetchProductUsecase {
  constructor(private readonly repository: IProductRepository) {}

  async find(identityParam: {
    _id?: string;
    name?: string;
  }): Promise<IproductEntity> {
    const { _id, name } = identityParam;
    let product: IproductEntity;

    if (_id === undefined && name === undefined) {
      throw new TypeError("no identity param passed");
    }

    if (_id) {
      product = await this.repository.findProduct(_id);
      return product;
    }
    product = await this.repository.findProduct(name);
    return product;
  }

  async fetchAllProducts(): Promise<IproductEntity[]> {
    const products = await this.repository.findAll();
    return products;
  }
  //todo: implement method to fetchAll products belonging to a single distributor
}
