/* istanbul ignore file */
import { Model, RelationMappings } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";
import User from "../../../users_service/service_repository/models/user.modal";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
export default class Transcation extends Model {
  product_id: number;
  user_id:number;
  Amount:number;
  _id: number;
  static get tableName(): string {
    return TableName.Transcation;
  }
  static get idColumn() {
    return "_id";
  }

  static relationMappings: RelationMappings = {
    [TableName.user]: {
      modelClass: User,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.Transcation}.${TableName.user}_id`,
        to: `${TableName.user}._id`,
      },
    },
  };
}
