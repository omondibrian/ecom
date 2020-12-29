/* istanbul ignore file */
import Knex = require("knex");
import { Model, RelationMappings } from "objection";

import { con } from "../../../../constants/config";

import TableName from "../../../../constants/tableNames";
import Address from "./address.model";

const config = con[process.env.NODE_ENV || "development"];
const database = Knex(config);
Model.knex(database);

export default class Vendor extends Model {
  _id?: number;
  user_id: number;
  name: string;
  address: UsersService.IAddress;
  logo_url: string;
  email: string;
  description: string;
  static get tableName(): string {
    return TableName.Vendor;
  }

  static get idColumn() {
    return "_id";
  }
  static relationMappings: RelationMappings = {
    address: {
      modelClass: Address,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.Vendor}.${TableName.address}_id`,
        to: `${TableName.address}._id`,
      },
    },
  };
}
