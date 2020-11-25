import { IproductEntity } from "../entity/productEntity";
import { IProductRepository } from "../Repository/productsRepository";

export class DeleteProductInfo {
  constructor(private readonly repository: IProductRepository) {}

  async deleteProduct(
    productId: string
  ): Promise<{
    deletedProduct: IproductEntity;
    deleted: boolean;
  }> {
    const deletedProduct = await this.repository.deleteProduct(productId);
    return deletedProduct;
  }
}
