export interface OrderEntity {
  _id: string;
  cust_id: string;
  productsList: {
    _id: string;
    name: string;
    price: string;
    discount: string;
    productPic: string;
    distributor_id: string;
    QtyToBeBought: number;
  }[];
}

export interface Receipt extends OrderEntity {
    name:string
}
