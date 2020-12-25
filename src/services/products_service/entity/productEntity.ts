export interface IproductEntity {
  name: string;
  Qty: number;
  price: string;
  discount: string;
  distributor_id: string;
  productPic: string;
  _id: string;
}

interface ProductDetails {
  description: string;
  dimensions: string;
  color: string;
  front_view_image_url: string;
  rare_view_image_url: string;
  left_view_image_url: string;
  right_view_image_url: string;
  category_id: string;
}
