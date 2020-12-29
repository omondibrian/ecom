export class ProductsTestRepository
  implements ProductsService.IProductRepository {
  distributorProducts(
    distributorId: string
  ): Promise<ProductsService.IproductEntity[]> {
    throw new Error("Method not implemented.");
  }
  deleteProduct(
    productId: string
  ): Promise<{
    deletedProduct: ProductsService.IproductEntity;
    deleted: boolean;
  }> {
    throw new Error("Method not implemented.");
  }
  updateProduct(payload: {
    productId: string;
    fields:ProductsService.IupdateParams;
  }): Promise<ProductsService.IproductEntity> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<ProductsService.IproductEntity[]> {
    throw new Error("Method not implemented.");
  }

  addProduct(
    searchParam: ProductsService.IproductEntity
  ): Promise<ProductsService.IproductEntity> {
    throw new Error("Method not implemented.");
  }

  findProduct(searchParam: string): Promise<ProductsService.IproductEntity> {
    return null;
  }
}
