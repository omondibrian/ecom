import * as Knex from "knex";

const addDefaultColumns = (table: Knex.CreateTableBuilder): void => {
  table.timestamps(false, true);
  table.dateTime("deletedAt", { useTz: true });
};

const createRef = (table: Knex.CreateTableBuilder, foreignTable: string) => {
  table
    .integer(`${foreignTable}_id`)
    .unsigned()
    .references("_id")
    .inTable(foreignTable)
    .notNullable()
    .onDelete("cascade");
};

export  {
  addDefaultColumns,
  createRef,
};
