/* istanbul ignore file */
import { Model, RelationMappings } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";
import OrderedProduct from "./orderedProducts.model";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class Order extends Model {
    _id: string;
    cust_id: number;
    status:string;
    transcation_id:number;
    productsList: {
      _id: string;
      name: string;
      price: string;
      discount: string;
      vat: number;
      distributor_id: string;
      QtyToBeBought: number;
    }[];
  static get tableName(): string {
    return TableName.order;
  }
  static get idColumn() {
    return "_id";
  }

  static relationMappings: RelationMappings = {
 
    [TableName.orderedProducts]: {
      modelClass: OrderedProduct,
      relation: Model.HasManyRelation,
      join: {
        from: `${TableName.orderedProducts}.${TableName.order}_id`,
        to: `${TableName.order}._id`,
      },
    },
  };
}
