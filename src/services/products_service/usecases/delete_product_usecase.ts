export class DeleteProductInfo {
  constructor(
    private readonly repository: ProductsService.IProductRepository
  ) {}

  async deleteProduct(
    productId: string
  ): Promise<{
    deletedProduct: ProductsService.IproductEntity;
    deleted: boolean;
  }> {
    const deletedProduct = await this.repository.deleteProduct(productId);
    return deletedProduct;
  }
}
