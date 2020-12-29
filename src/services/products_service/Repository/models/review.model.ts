/* istanbul ignore file */
import { Model } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";
import Vendor from "../../../users_service/service_repository/models/vendor.model";
import Product from "./products.model";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class Reviews extends Model {
  static get tableName(): string {
    return TableName.Ranking;
  }
  static get idColumn() {
    return "_id";
  }
  static relationMappings = {
    vendor: {
      modelClass: Vendor,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.Ranking}.${TableName.Vendor}_id`,
        to: `${TableName.Vendor}_id`,
      },
    },
    product: {
      modelClass: Product,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.Ranking}.${TableName.product}_id`,
        to: `${TableName.product}_id`,
      },
    },
  };
}
