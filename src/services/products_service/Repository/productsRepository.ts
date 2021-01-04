import TableName from "../../../constants/tableNames";
import Product from "./models/products.model";
import ProductDetails from "./models/product_details.model";

export class ProductsRepository implements ProductsService.IProductRepository {
  async updateProductQty(params: {
    _id: number;
    qty: number;
  }): Promise<ProductsService.IproductEntity> {
    let product: Product;
    while (!product) {
      product = await Product.query().findById(params._id);
      
    }
    if (product.quantity_in_stock ) {
      
      const updateQty = product.quantity_in_stock - params.qty;
      const result = await Product.query().updateAndFetchById(params._id, {
        quantity_in_stock: updateQty,
      });
      
      return {
        name:result.name,
        vat:result.vat,
        Qty: result.quantity_in_stock,
        price: result.price + "",
        discount: result.discount + "",
        distributor_id: result.distributor_id + "",
      };
    }
  }
  async findProduct(
    searchParam: string
  ): Promise<ProductsService.IproductEntity> {
    const product = await Product.query()
      .withGraphFetched({
        [TableName.productDetails]: true,
      })
      .where({ _id: searchParam });
      
    return {
      Qty: product[0].quantity_in_stock,
      discount: product[0].discount + "",
      distributor_id: product[0].distributor_id + "",
      name: product[0].name,
      price: product[0].price + "",
      vat: product[0].vat,
      productDetails: {
        category_id: product[0].product_details.category_id,
        sub_category_id: product[0].product_details.sub_category_id,
        color: product[0].product_details.color,
        right_view_image_url: product[0].product_details.right_view_image_url,
        rare_view_image_url: product[0].product_details.rare_view_image_url,
        left_view_image_url: product[0].product_details.left_view_image_url,
        front_view_image_url: product[0].product_details.front_view_image_url,
        description: product[0].product_details.description,
        dimensions: product[0].product_details.dimensions,
      },
    };
  }
  async findAll(): Promise<ProductsService.IproductEntity[]> {
    const products = await Product.query().withGraphFetched({
      [TableName.productDetails]: true,
    });
    const result = products.map((product) => {
      return {
        Qty: product.quantity_in_stock,
        discount: product.discount + "",
        distributor_id: product.distributor_id + "",
        name: product.name,
        price: product.price + "",
        vat: product.vat,
        productDetails: { ...product.product_details },
      };
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
      return {
        Qty: product.quantity_in_stock,
        discount: product.discount + "",
        distributor_id: product.distributor_id + "",
        name: product.name,
        price: product.price + "",
        vat: product.vat,
        productDetails: { ...product.product_details },
      };
    });
    return result;
  }
  async addProduct(
    searchParam: ProductsService.IproductEntity
  ): Promise<ProductsService.IproductEntity> {
    const {
      name,
      Qty,
      price,
      discount,
      distributor_id,
      productDetails,
      vat,
    } = searchParam;
    // const prodDetails = await ProductDetails.query().insert({...productDetails});
    // const vendor = await Vendor.query().insert({...productDetails})

    const product = await Product.query().insertGraphAndFetch(
      {
        name,
        quantity_in_stock: Qty,
        vat,
        price: parseInt(price),
        discount: parseInt(discount),
        distributor_id: parseInt(distributor_id),
        [TableName.productDetails]: {
          ...productDetails,
        },
      },
      { relate: [TableName.Vendor] }
    );
    // console.log(product);
    const {
      category_id,
      sub_category_id,
      color,
      right_view_image_url,
      rare_view_image_url,
      left_view_image_url,
      front_view_image_url,
      description,
      dimensions,
    } = product.product_details;
    return {
      Qty: product.quantity_in_stock,
      discount: `${product.discount}`,
      distributor_id: `${product.distributor_id}`,
      name: product.name,
      price: `${product.price}`,
      vat: product.vat,
      productDetails: {
        category_id,
        sub_category_id,
        color,
        right_view_image_url,
        rare_view_image_url,
        left_view_image_url,
        front_view_image_url,
        description,
        dimensions,
      },
    };
  }
  async updateProduct(payload: {
    productId: string;
    fields: ProductsService.IupdateParams;
  }): Promise<ProductsService.IproductEntity> {
    const { Qty, price, discount, vat } = payload.fields;
    const result = await Product.query()
      .updateAndFetchById(parseInt(payload.productId), {
        quantity_in_stock: Qty,
        price: parseFloat(price),
        discount: parseFloat(discount),
        vat,
      })
      .withGraphFetched({ [TableName.productDetails]: true });
    // console.log(result);
    return {
      name: result.name,
      Qty: result.quantity_in_stock,
      price: result.price + "",
      discount: result.discount + "",
      vat: result.vat,
      distributor_id: result.distributor_id + "",
      productDetails: { ...result.product_details },
    };
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
    const PID = deletedProduct[0].product_details._id;
    Promise.all([
      await Product.query().deleteById(productId),
      await ProductDetails.query().deleteById(PID),
    ]);

    return {
      deletedProduct: {
        Qty: deletedProduct[0].quantity_in_stock,
        discount: deletedProduct[0].discount + "",
        distributor_id: deletedProduct[0].distributor_id + "",
        name: deletedProduct[0].name,
        price: deletedProduct[0].price + "",
        vat: deletedProduct[0].vat,
        productDetails: { ...deletedProduct[0].product_details },
      },
      deleted: deletedProduct ? true : false,
    };
  }
}
