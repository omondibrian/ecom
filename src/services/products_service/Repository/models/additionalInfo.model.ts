/* istanbul ignore file */
import { Model } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class AdditionalInfo extends Model {
  static get tableName(): string {
    return TableName.address;
  }
  static get idColumn() {
    return '_id';
  }
}