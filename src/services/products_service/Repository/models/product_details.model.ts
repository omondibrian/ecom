/* istanbul ignore file */
import { Model } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";
import Product from "./products.model";
import Category from "./category.model";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class ProductDetails  extends  Model {
  static get tableName(): string {
    return TableName.productDetails;
  }
  static get idColumn() {
    return "_id";
  }
  _id?: number;
  category_id: number;
  color: string;
  description: string;
  dimensions: string;
  front_view_image_url: string;
  left_view_image_url: string;
  rare_view_image_url: string;
  right_view_image_url: string;
  product_details_id?:number;
  static relationMappings = {
    product: {
      modelClass: Product,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.productDetails}.${TableName.product}_id`,
        to: `${TableName.product}._id`,
      },
    },
    [TableName.category]: {
      modelClass: Category,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.product}.${TableName.category}_id`,
        to: `${TableName.category}_id`,
      },
    },
  };
}
