import { IproductEntity } from "../entity/productEntity";
import { IProductRepository } from "./../Repository/productsRepository";
export class UpdateProductInfo {
  constructor(private readonly repository: IProductRepository) {}

  async updateProduct(payload: {
    _id: string;
    updatedFields: {
      name?: string;
      price?: string;
      discount?: string;
      productPic?: string;
      Qty?:string
    };
  }): Promise<IproductEntity> {
    const { _id, updatedFields } = payload;
    const keys = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    let fields: Array<{ key: string; value: string }> = [];
    //O(n)
    let keyIndex = keys.length;
    while (keyIndex--) {
      const value = values[keyIndex];
      const key = keys[keyIndex];
      let field = { key, value };
      fields.push(field);
    }
    const updatedProduct = await this.repository.updateProduct({
      productId: _id,
      fields,
    });

    return updatedProduct;
  }
}
