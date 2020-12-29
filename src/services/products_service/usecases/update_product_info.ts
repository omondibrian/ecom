
export class UpdateProductInfo {
  constructor(private readonly repository: ProductsService.IProductRepository) {}

  async updateProduct(payload: {
    _id: string;
    updatedFields: ProductsService.IupdateParams
  }): Promise<ProductsService.IproductEntity> {
    const { _id, updatedFields } = payload;
    
    const updatedProduct = await this.repository.updateProduct({
      productId: _id,
      fields:updatedFields,
    });

    return updatedProduct;
  }
}
