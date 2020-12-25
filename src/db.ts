import knex from "knex";
import { Model } from "objection";

import { con as knexConfig } from "./constants/config";

const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

Model.knex(connection);

module.exports = connection;
