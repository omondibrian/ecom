/* istanbul ignore file */
import { Model } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";
import Category from "./category.model";
import AdditionalInfo from "./additionalInfo.model";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class SubCategory extends Model {
  static get tableName(): string {
    return TableName.subCategory;
  }
  static get idColumn() {
    return "_id";
  }

  static relationMappings = {
    category: {
      modelClass: Category,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.subCategory}.${TableName.category}_id`,
        to: `${TableName.category}._id`,
      },
    },
    additionalInfo: {
      modelClass: AdditionalInfo,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.subCategory}.${TableName.additionalInfo}_id`,
        to: `${TableName.additionalInfo}._id`,
      },
    },
  };
}
