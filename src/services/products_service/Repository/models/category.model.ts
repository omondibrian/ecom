/* istanbul ignore file */
import { Model } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";
import SubCategory from "./sub_category.model";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class Category extends Model {
  static get tableName(): string {
    return TableName.category;
  }
  static get idColumn() {
    return "_id";
  }
  static relationMappings = {
    sub_category: {
      modelClass: SubCategory,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.subCategory}.${TableName.category}_id`,
        to: `${TableName.category}._id`,
      },
    },
  };
}
