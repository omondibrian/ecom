import * as Knex from "knex";
import orderedTableNames from "../../src/constants/orderedTableNames";
import TableName from "../../src/constants/tableNames";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await Promise.all(
    orderedTableNames.map(
      async (tableName: string) => await knex(tableName).del()
    )
  );
  const country = [{ name: "kenya" }, { name: "Tanzania" }, { name: "Uganda" }];
  const city = [{ name: "Nairobi" }, { name: "Dodoma" }, { name: "Kampala" }];
  await Promise.all([
    knex(TableName.country).insert(country),
    knex(TableName.city).insert(city),
  ]);
  const [countryRes, cityRes] = await Promise.all([
    knex.select("_id").from(TableName.country),
    knex.select("_id").from(TableName.city),
  ]);

  const address = {
    street_address_1: "testStreet",
    P_O_BOX: "536-20115 TestArea",
    country_id: countryRes[0]._id,
    city_id: cityRes[0]._id,
  };
  await knex(TableName.address).insert(address);
  const addID = await knex.select("_id").from(TableName.address);

  const newUser: UsersService.IUser = {
    name: "testUser",
    password: "test",
    email: "testUser@test.com",
    phone_number: "13011999",
    address_id: addID[0]._id,
    profile_image_url: "testpath//test.jpg",
  };

  // Inserts seed entry
  await knex(TableName.user).insert(newUser);
  const user = await knex.select("_id").from(TableName.user);
  const Vendor = {
    user_id: user[0]._id,
    name: "TestVendor",
    address_id: addID[0]._id,
    logo_url: "/logo.jpg",
    email: "testVendor.co.ke",
    description: "testVendor we deel in test Products",
  };

  await knex(TableName.Vendor).insert(Vendor);
  const vendorRes = await knex.select("*").from(TableName.Vendor);
  const additionalInfo = {
    model: "testModel",
    display_size: "12 inch",
  };

  await knex(TableName.additionalInfo).insert(additionalInfo);
  const addInfo = await knex.select("*").from(TableName.additionalInfo);
  const category = {
    name: "testCategory",
  };
  await knex(TableName.category).insert(category);
  const catId = await knex.select("*").from(TableName.category);

  const subCategory = {
    name: "testSubCategory",
    additional_info_id: addInfo[0]._id,
    category_id: catId[0]._id,
  };
  await knex(TableName.subCategory).insert(subCategory);
  const subCatId = await knex.select("*").from(TableName.subCategory);

  const product = {
    name: "testProduct",
    quantity_in_stock: 12,
    price: 12,
    discount: 2.0,
    Vendor_id: vendorRes[0]._id,
    vat: 8,
    category_id: catId[0]._id,
    sub_category_id: subCatId[0]._id,
  };
  const prod2 = {
    name: "testProduct2",
    quantity_in_stock: 12,
    price: 12,
    discount: 2.0,
    Vendor_id: vendorRes[0]._id,
    vat: 8,
    category_id: catId[0]._id,
    sub_category_id: subCatId[0]._id,
  };
  await knex(TableName.product).insert([product, prod2]);
  const ProdID = await knex.select("*").from(TableName.product);

  const prodDetails = {
    description: "test description",
    dimensions: "10 X 10 inches",
    color: "orange",
    front_view_image_url: "/front.jpg",
    rare_view_image_url: "/rare.jpg",
    left_view_image_url: "/left.jpg",
    right_view_image_url: "/right.jpg",
    product_id: ProdID[0]._id,
  };
  await knex(TableName.productDetails).insert(prodDetails);
  const prodDetailsRes = await knex.select("*").from(TableName.productDetails);

  const transcation = {
    user_id: user[0]._id,
    Amount: 50,
  };
  await knex(TableName.Transcation).insert(transcation);
  const tranID = await knex.select("*").from(TableName.Transcation);

  const order = {
    user_id: user[0]._id,
    status: "inprogress",
    transcation_id: tranID[0]._id,
  };
  await knex(TableName.order).insert(order);
  const orderID = await knex.select("*").from(TableName.order);

  const orderedProducts = [
    {
      order_id: orderID[0]._id,
      product_id: ProdID[0]._id,
    },
    {
      order_id: orderID[0]._id,
      product_id: ProdID[1]._id,
    },
  ];
  await knex(TableName.orderedProducts).insert(orderedProducts);
  const Oprods = await knex.select("*").from(TableName.orderedProducts);

  console.log(Oprods);
  console.log("Ordered ID", orderID);
}
