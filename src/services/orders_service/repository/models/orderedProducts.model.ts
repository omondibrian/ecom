/* istanbul ignore file */
import { Model, RelationMappings } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class OrderedProduct extends Model {
  product_id: number;
  order_id: number;
  QtyToBeBought: number;
  product: ProductsService.IproductEntity;
  _id: string;
  name: string;
  price: string;
  discount: string;
  vat: number;
  distributor_id: string;
  static get tableName(): string {
    return TableName.orderedProducts;
  }
  static get idColumn() {
    return "_id";
  }

  static relationMappings: RelationMappings = {
    [TableName.order]: {
      modelClass: OrderedProduct,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.orderedProducts}.${TableName.order}_id`,
        to: `${TableName.orderedProducts}._id`,
      },
    },
    [TableName.product]: {
      modelClass: OrderedProduct,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.orderedProducts}.${TableName.product}_id`,
        to: `${TableName.product}._id`,
      },
    },
  };
}
