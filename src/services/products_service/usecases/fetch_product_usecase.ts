
export class FetchProductUsecase {
  constructor(private readonly repository:ProductsService. IProductRepository) {}

  async find(identityParam: {
    _id?: string;
    name?: string;
  }): Promise<ProductsService.IproductEntity> {
    const { _id, name } = identityParam;
    let product: ProductsService.IproductEntity;

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

  async fetchAllProducts(): Promise<ProductsService.IproductEntity[]> {
    const products = await this.repository.findAll();
    return products;
  }

  async distributorProducts(distributorID: string) {
    const distributorProds = await this.repository.distributorProducts(
      distributorID
    );
    return distributorProds;
  }
}
