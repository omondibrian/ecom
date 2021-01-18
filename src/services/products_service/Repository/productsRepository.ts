import { MaybeCompositeId } from "objection";
import TableName from "../../../constants/tableNames";
import Product from "./models/products.model";
import ProductDetails from "./models/product_details.model";

export class ProductsRepository implements ProductsService.IProductRepository {
  async updateProductQty(params: {
    _id: number;
    qty: number;
  }): Promise<ProductsService.IproductEntity> {
    let product: Product | undefined;
    let result: Product | undefined = {} as Product;
    while (!product) {
      product = await Product.query().findById(params._id);
    }
    if (product.quantity_in_stock) {
      const updateQty = product.quantity_in_stock - params.qty;
      result = await Product.query().updateAndFetchById(params._id, {
        quantity_in_stock: updateQty,
      });
      console.log("result", result);
      return {
        name: result!.name,
        vat: result!.vat,
        Qty: result!.quantity_in_stock,
        price: result!.price + "",
        discount: result!.discount + "",
        distributor_id: result!.distributor_id + "",
      };
    }
    return;
  }
  async findProduct(
    searchParam: string
  ): Promise<ProductsService.IproductEntity> {
    const product = await Product.query()
      .withGraphFetched({
        [TableName.productDetails]: true,
      })
      .where({ _id: searchParam });

    return this._returnMethod(product[0]);
  }

  async findAll(): Promise<ProductsService.IproductEntity[]> {
    const products = await Product.query().withGraphFetched({
      [TableName.productDetails]: true,
    });
    const result = products.map((product) => {
      return this._returnMethod(product);
    });
    return result;
  }
  async distributorProducts(
    distributorId: string
  ): Promise<ProductsService.IproductEntity[]> {
    const distributorProducts = await Product.query()
      .withGraphFetched({
        [TableName.productDetails]: true,
      })
      .where({ distributor_id: distributorId });
    const result = distributorProducts.map((product) => {
      return this._returnMethod(product);
    });
    return result;
  }
  async addProduct(
    searchParam: ProductsService.IproductEntity
  ): Promise<ProductsService.IproductEntity> {
    const product = await Product.query().insertGraphAndFetch(
      {
        name: searchParam!.name,
        quantity_in_stock: searchParam.Qty,
        vat: searchParam!.vat,
        price: parseInt(searchParam!.price),
        discount: parseInt(searchParam!.discount),
        distributor_id: parseInt(searchParam!.distributor_id),
        [TableName.productDetails]: {
          ...searchParam!.productDetails,
        },
      },
      { relate: [TableName.Vendor] }
    );
    return this._returnMethod(product);
  }
  async updateProduct(payload: {
    productId: string;
    fields: ProductsService.IupdateParams;
  }): Promise<ProductsService.IproductEntity> {
    const { Qty, price, discount, vat } = payload.fields;
    const result = await Product.query()
      .updateAndFetchById(parseInt(payload.productId), {
        quantity_in_stock: Qty,
        price: parseFloat(price as string),
        discount: parseFloat(discount as string),
        vat,
      })
      .withGraphFetched({ [TableName.productDetails]: true });
    return this._returnMethod(result, true);
  }
  async deleteProduct(
    productId: string
  ): Promise<{
    deletedProduct: ProductsService.IproductEntity;
    deleted: boolean;
  }> {
    const deletedProduct = await Product.query()
      .withGraphFetched({
        [TableName.productDetails]: true,
      })
      .where({ _id: productId });
    const PID = deletedProduct[0].product_details!._id;
    Promise.all([
      await Product.query().deleteById(productId),
      await ProductDetails.query().deleteById(PID as MaybeCompositeId),
    ]);
    return {
      deletedProduct: this._returnMethod(deletedProduct[0], true),
      deleted: deletedProduct ? true : false,
    };
  }

  private _returnMethod(
    product: Product,
    showId: boolean = false
  ): ProductsService.IproductEntity {
    let details: ProductsService.ProductDetails = {
      category_id: product.product_details!.category_id,
      sub_category_id: product.product_details!.sub_category_id,
      color: product.product_details!.color,
      right_view_image_url: product.product_details!.right_view_image_url,
      rare_view_image_url: product.product_details!.rare_view_image_url,
      left_view_image_url: product.product_details!.left_view_image_url,
      front_view_image_url: product.product_details!.front_view_image_url,
      description: product.product_details!.description,
      dimensions: product.product_details!.dimensions,
    };
    if (showId) details._id = product.product_details!._id;

    return {
      Qty: product!.quantity_in_stock,
      discount: product.discount + "",
      distributor_id: product.distributor_id + "",
      name: product.name,
      price: product.price + "",
      vat: product.vat,
      productDetails: details,
    };
  }
}
