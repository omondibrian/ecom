import Product from "../../../../../services/products_service/Repository/models/products.model";
import { ProductsRepository } from "../../../../../services/products_service/Repository/productsRepository";

const repository = new ProductsRepository();

describe("ProductsRepository", () => {
  afterAll(() => {
    Product.knex().destroy();
  });

  const product: ProductsService.IproductEntity = {
    name: "testProduct",
    Qty: 12,
    price: "12",
    discount: "2",
    distributor_id: "1",
    vat: 8,
    productDetails: {
      category_id: 1, //electronics
      sub_category_id: 1, //mobile
      color: "Black",
      description:
        'The iPhone 11 succeeds the iPhone XR, and it features a 6.1-inch LCD display that Apple calls a "Liquid Retina HD Display." ',
      dimensions: "6.1 inches",
      front_view_image_url:
        "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg",
      left_view_image_url:
        "https://fdn.gsmarena.com/imgroot/reviews/19/apple-iphone-11/lifestyle/-1024w2/gsmarena_003.jpg",
      rare_view_image_url:
        "https://www.gizmochina.com/wp-content/uploads/2019/09/Apple-iPhone-11-1-500x500.jpg",
      right_view_image_url:
        "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-3.jpg",
    },
  };
  describe("ProductsRepository.addProduct()", () => {
    it("should successfully add new Product", async () => {
      const result = await repository.addProduct(product);
      expect(result).toStrictEqual<ProductsService.IproductEntity>(product);
    });
  });

  describe("ProductsRepository.findProduct()", () => {
    it("should successfully fetch a product from the database", async () => {
      const result = await repository.findProduct("3");
      expect(result).toStrictEqual<ProductsService.IproductEntity>(product);
    });
  });

  describe("ProductsRepository.findAll()", () => {
    it("should successfully fetch all product from the database", async () => {
      const result = await repository.findAll();
      expect(result.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("ProductsRepository.findAll()", () => {
    it("should successfully fetch all product from the database", async () => {
      const result = await repository.distributorProducts("1");
      expect(result[0].distributor_id).toBe("1");
    });
  });
  describe("ProductRepository.updateQty()", () => {
    it("should successfully update product Qty", async () => {
      const product = await repository.updateProductQty({
        _id: 3,
        qty: 2,
      });
      expect(product).toStrictEqual({ ...product, Qty: 10 });
    });
  describe("ProductsRepository.updateProduct()", () => {
    const updates = {
      name: "testProduct",
      Qty: 20,
      price: "1200",
      discount: "200",
      vat: 14,
      distributor_id: "1",
      productDetails: {
        category_id: 1, //electronics
        sub_category_id: 1, //mobile
        _id: 1,
        color: "orange",
        description: "test description",
        dimensions: "10 X 10 inches",
        front_view_image_url: "/front.jpg",
        left_view_image_url: "/left.jpg",
        rare_view_image_url: "/rare.jpg",
        right_view_image_url: "/right.jpg",
      },
    };
    it("should successfully update a Product", async () => {
      const result = await repository.updateProduct({
        productId: "1",
        fields: {
          Qty: 20,
          price: "1200.00",
          discount: "200.00",
          vat: 14,
        },
      });

      expect(result).toStrictEqual<ProductsService.IproductEntity>(updates);
    });
  });
 
    describe("ProductsRepository.deleteProduct()", () => {
      const id = "1";
      const deletedProduct = {
        name: "testProduct",
        Qty: 20,
        price: "1200",
        discount: "200",
        vat: 14,
        distributor_id: "1",
        productDetails: {
          category_id: 1, //electronics
          sub_category_id: 1, //mobile
          _id: 1,
          color: "orange",
          description: "test description",
          dimensions: "10 X 10 inches",
          front_view_image_url: "/front.jpg",
          left_view_image_url: "/left.jpg",
          rare_view_image_url: "/rare.jpg",
          right_view_image_url: "/right.jpg",
        },
      };
      it("should successfully remove the selected product", async () => {
        const result = await repository.deleteProduct(id);
        expect(result.deleted).toBeTruthy();
        expect(
          result.deletedProduct
        ).toStrictEqual<ProductsService.IproductEntity>(deletedProduct);
      });
    });
  });
});
