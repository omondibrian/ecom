import * as Knex from "knex";
import orderedTableNames from "../../src/constants/orderedTableNames";
import TableName from "../../src/constants/tableNames";
import { addDefaultColumns, createRef } from "../../src/lib/tableUtiles";

export async function up(knex: Knex): Promise<void> {
  await Promise.all([
    //Country table
    await knex.schema.createTable(
      TableName.country,
      (table: Knex.CreateTableBuilder) => {
        table.increments("_id").notNullable().primary();
        table.string("name").notNullable();
        addDefaultColumns(table);
      }
    ),
    //City Table
    await knex.schema.createTable(
      TableName.city,
      (table: Knex.CreateTableBuilder) => {
        table.increments("_id").notNullable().primary();
        table.string("name").notNullable();
        addDefaultColumns(table);
      }
    ), //Address table
    //TODO: should add the users/vendors id field relation
    await knex.schema.createTable(
      TableName.address,
      (table: Knex.CreateTableBuilder) => {
        table.increments("_id").notNullable().primary();
        table.string("street_address_1").notNullable();
        table.string("street_address_2").nullable();
        createRef(table, TableName.country);
        createRef(table, TableName.city);
        table.string("P_O_BOX").nullable();
      }
    ),
    //User Table
    await knex.schema.createTable(
      TableName.user,
      (table: Knex.CreateTableBuilder) => {
        table.increments("_id").notNullable().primary();
        table.string("name").notNullable();
        table.string("email", 254).notNullable().unique();
        table.string("password").notNullable();
        table.integer("phone_number").notNullable().unique();
        table
          .string("profile_image_url")
          .defaultTo("../static/defaultProfileImage.jpg");
        createRef(table, TableName.address);
        addDefaultColumns(table);
      }
    ),
    //AdditionalInfo table
    await knex.schema.createTable(
      TableName.additionalInfo,
      (table: Knex.CreateTableBuilder) => {
        table.increments("_id").notNullable().primary();
        table.string("model").unique().nullable();
        table.dateTime("released_on").nullable();
        table.string("display_size").unique().nullable();
        addDefaultColumns(table);
      }
    ),
  ]);

  //Vendor table
  await knex.schema.createTable(
    TableName.Vendor,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      table.string("name").notNullable();
      table.string("logo_url").notNullable();
      table.string("email").notNullable();
      table.string("description");
      createRef(table, TableName.user);
      createRef(table, TableName.address);
    }
  );

  //category table
  await knex.schema.createTable(
    TableName.category,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      table.string("name").notNullable();
    }
  );
  //sub_category table
  await knex.schema.createTable(
    TableName.subCategory,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      table.string("name").notNullable();
      createRef(table, TableName.category);
      createRef(table, TableName.additionalInfo);
    }
  );

  //product_details table
  await knex.schema.createTable(
    TableName.productDetails,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      table.string("description");
      table.string("dimensions");
      table.string("color");
      table.string("front_view_image_url");
      table.string("rare_view_image_url");
      table.string("left_view_image_url");
      table.string("right_view_image_url");
      createRef(table, TableName.category);
      createRef(table, TableName.subCategory);
    }
  );

  //product table
  await knex.schema.createTable(
    TableName.product,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      table.string("name").notNullable();
      table.integer("quantity_in_stock").notNullable();
      table.integer("price").notNullable();
      table.integer("vat");
      table.integer("discount");
      table.integer('distributor_id');
      // createRef(table, TableName.Vendor);
      createRef(table, TableName.productDetails);
    }
  );

  //ranking table
  //TODO:rename to reviews table
  await knex.schema.createTable(
    TableName.Ranking,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      table.string("num_stars").notNullable();
      createRef(table, TableName.product);
      createRef(table, TableName.Vendor);
    }
  );
  //transcation table
  await knex.schema.createTable(
    TableName.Transcation,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      table.integer("Amount").notNullable();
      createRef(table, TableName.user);
    }
  );
  //order table
  await knex.schema.createTable(
    TableName.order,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      table.enum("status", [
        "inprogress",
        "inTransit",
        "delivered",
        "returned",
      ]);
      createRef(table, TableName.user);
      table
        .dateTime("date_of_purhase")
        .notNullable()
        .defaultTo(new Date().toISOString());
      table.dateTime("date_of_delivery").nullable();
      table.dateTime("return_date").nullable();

      createRef(table, TableName.Transcation);
    }
  );
  //ordered_products table
  await knex.schema.createTable(
    TableName.orderedProducts,
    (table: Knex.CreateTableBuilder) => {
      table.increments("_id").notNullable().primary();
      createRef(table, TableName.product);
      createRef(table, TableName.order);
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all(
    orderedTableNames.map(async (tableName: string) =>
      knex.schema.dropTableIfExists(tableName)
    )
  );
}
