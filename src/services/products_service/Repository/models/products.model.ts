/* istanbul ignore file */
import { Model, RelationMappings } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";
import ProductDetails from "./product_details.model";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class Product extends Model {
  id?:number;
  name: string;
  Qty: number;
  quantity_in_stock:number;
  price: number;
  discount: number;
  distributor_id: number;
  vat: number;
  productPic: string;
  productDetails?: ProductsService.ProductDetails;
  product_details?: ProductsService.ProductDetails;
  static get tableName(): string {
    return TableName.product;
  }
  static get idColumn() {
    return "_id";
  }

  static relationMappings: RelationMappings = {
 
    [TableName.productDetails]: {
      modelClass: ProductDetails,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.product}.${TableName.productDetails}_id`,
        to: `${TableName.productDetails}._id`,
      },
    },
  };
}
