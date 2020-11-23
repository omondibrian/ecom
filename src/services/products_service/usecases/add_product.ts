import { IproductEntity } from "../entity/productEntity";
import { IProductRepository } from "../Repository/productsRepository";

export class AddProductUsecase {
  constructor(private readonly repository: IProductRepository) {}
  async add(product: IproductEntity): Promise<IproductEntity> {
    const existingProduct = await this.repository.findProduct(product.name);
    let result: IproductEntity;
    if (!existingProduct) {
      result = await this.repository.addProduct(product);
      return result;
    }
    const { _id, Qty } = existingProduct;
    result = await this.repository.updateProduct({
      productId: _id,
      fields: [{ key: "Qty", value: `${Qty + product.Qty}` }],
    });
    return result;
  }
}
