import { Model, RelationMapping } from "objection";
import TableName from "../../../../constants/tableNames";
import knex from "knex";
import { con as knexConfig } from "../../../../constants/config";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);
import Country from "./country.model";
import City from "./city.model";

export default class Address extends Model {
  static get tableName(): string {
    return TableName.address;
  }
  static get idColumn() {
    return '_id';
  }
  static relationMappings = {
    country: {
      relation: Model.BelongsToOneRelation,
      modelClass: Country,
      join: {
        from: `${TableName.address}.${TableName.country}_id`,
        to: `${TableName.country}._id`,
      },
    }as RelationMapping<Country>,
    city: {
      relation: Model.BelongsToOneRelation,
      modelClass: City,
      join: {
        from: `${TableName.address}.${TableName.city}_id`,
        to: `${TableName.city}._id`,
      },
    },
  };
}

(function evec(){
  console.log(`Address = ${
    Address.query().withGraphJoined([TableName.address, TableName.country, TableName.city])
  }`);
})