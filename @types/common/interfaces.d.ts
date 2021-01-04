declare namespace UsersService {
  interface UserEntity {
    _id?: number | string;
    name: string;
    email: string;
    phoneNumber: string;
    profilePic: string;
    Address: IAddress;
  }

  type fieldProperties =
    | "_id"
    | "name"
    | "email"
    | "phone_number"
    | "profile_image_url"
    | "address_id";
  interface IUpdateField {
    field: fieldProperties;
    value: string;
  }
  interface UserCredentials {
    email?: string;
    phoneNumber?: string;
    password: string;
  }
  interface IVendorEntity {
    _id?: number;
    user_id: number;
    name: string;
    Address: IAddress;
    logo_url: string;
    email: string;
    description: string;
  }
  interface IVendorModel {
    _id?: number;
    user_id: number;
    name: string;
    Address: IAddress;
    logo_url: string;
    email: string;
    description: string;
  }
  type IAddress = {
    street_address_1: string;
    street_address_2?: string;
    P_O_BOX: string;
    city: {
      name: string;
    };
    country: {
      name: string;
    };
  };
  type validationFields = {
    email?: string;
    phone_number?: string;
    _id?: string;
  };
  type ProfileInputs = {
    _id: string;
    payload: string;
  };
  interface IUser extends UserCredentials {
    _id?: number;
    name: string;
    email: string;
    phone_number: string;
    profile_image_url: string;
    address_id: string;
  }
  interface IUserModel {
    _id?: number | string;
    name: string;
    email: string;
    phoneNumber: string;
    profilePic: string;
    password: string;
    Address: {
      street_address_1: string;
      street_address_2?: string;
      P_O_BOX: string;
      city: {
        name: string;
      };
      country: {
        name: string;
      };
    };
  }
  interface IUserRepository {
    findUser: (options: validationFields) => Promise<IUserModel>;
    saveUser: (options: IUserModel) => Promise<UserEntity>;
    UpdateUserField: (input: {
      options: validationFields;
      updateParam: IUpdateField;
    }) => Promise<UserEntity>;
    addNewVendor(input: IVendorEntity): Promise<IVendorModel>;
  }
}

declare namespace ProductsService {
  interface IProductRepository {
    findProduct(searchParam: string): Promise<IproductEntity>;
    findAll(): Promise<IproductEntity[]>;
    distributorProducts(distributorId: string): Promise<IproductEntity[]>;
    addProduct(searchParam: IproductEntity): Promise<IproductEntity>;
    updateProduct(payload: {
      productId: string;
      fields: IupdateParams;
    }): Promise<IproductEntity>;
    updateProductQty(params: {
      _id: number;
      qty: number;
    }): Promise<IproductEntity>;
    deleteProduct(
      productId: string
    ): Promise<{ deletedProduct: IproductEntity; deleted: boolean }>;
  }
  interface IupdateParams {
    name?: string;
    Qty?: number;
    price?: string;
    discount?: string;
    distributor_id?: string;
    vat?: number;
    _id?: string;
    productDetails?: {
      id?: number;
      description?: string;
      dimensions?: string;
      color?: string;
      front_view_image_url?: string;
      rare_view_image_url?: string;
      left_view_image_url?: string;
      right_view_image_url?: string;
      category_id?: number;
      sub_category_id?: number;
    };
  }

  interface IproductEntity {
    name: string;
    Qty: number;
    price: string;
    discount: string;
    distributor_id: string;
    vat: number;
    _id?: string;
    productDetails?: ProductDetails;
  }

  interface ProductDetails {
    _id?: number;
    description: string;
    dimensions: string;
    color: string;
    front_view_image_url: string;
    rare_view_image_url: string;
    left_view_image_url: string;
    right_view_image_url: string;
    category_id: number;
    sub_category_id: number;
  }
}

declare namespace OrderService {
  interface OrderEntity {
    _id?: string;
    cust_id: string;
    productsList: {
      _id?: string;
      name: string;
      price: string;
      discount: string;
      vat: number;
      distributor_id: string;
      QtyToBeBought: number;
    }[];
  }

  interface Receipt extends OrderEntity {
    name: string;
  }
  interface IOrdersRepository {
    //to throw an error if update is not succesfull
    updateProductQty(
      payload: { productId: string; Qty: number }[]
    ): Promise<boolean>;
    //fixme:update the paymentDetails structure
    authenticatePayments(
      order: OrderEntity
    ): Promise<{ isPayed: boolean; PaymentDetails: any }>;
    getCustName(id: string): Promise<string>;
    genOrder(order: OrderEntity): Promise<OrderEntity>;
    getOrders(distributorId: string): Promise<OrderEntity[]>;
  }
}
