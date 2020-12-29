
export class AddProductUsecase {
  constructor(private readonly repository:ProductsService.IProductRepository) {}
  async add(product: ProductsService.IproductEntity): Promise<ProductsService.IproductEntity> {
    const existingProduct = await this.repository.findProduct(product.name);
    let result: ProductsService.IproductEntity;
    if (!existingProduct) {
      result = await this.repository.addProduct(product);
      return result;
    }
    const { _id, Qty } = existingProduct;
    result = await this.repository.updateProduct({
      productId: _id,
      fields: {...existingProduct,Qty:Qty + product.Qty},
    });
    return result;
  }
}
