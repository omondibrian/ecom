/* istanbul ignore file */
import Knex = require("knex");
import { Model, RelationMappings } from "objection";

import { con } from "../../../../constants/config";

import TableName from "../../../../constants/tableNames";
import Address from "./address.model";

const config = con[process.env.NODE_ENV || "development"];
const database = Knex(config);
Model.knex(database);

export default class User extends Model {
  _id?: number;
  name: string;
  email: string;
  phone_number: string;
  profile_image_url: string;
  address_id: string;
  password: string;
  address:UsersService.IAddress;
  static get tableName(): string {
    return TableName.user;
  }

  static get idColumn() {
    return '_id';
  } 
  static relationMappings: RelationMappings = {
    address: {
      modelClass: Address,
      relation: Model.BelongsToOneRelation,
      join: {
        from: `${TableName.user}.${TableName.address}_id`,
        to: `${TableName.address}._id`,
      },
    },
  };
}
