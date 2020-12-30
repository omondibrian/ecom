export const ordersList: OrderService.OrderEntity[] = [
  {
    _id: "023",
    cust_id: "24",
    productsList: [
      {
        _id: "1",
        name: "OrderedTestProduct",
        price: "15",
        discount: "$3.0",
        vat: 8.0,
        distributor_id: "12",
        QtyToBeBought: 1,
      },
      {
        _id: "2",
        name: "OrderedTestProduct",
        price: "15",
        discount: "3.0",
        vat: 8.0,
        distributor_id: "12",
        QtyToBeBought: 2,
      },
    ],
  },
  {
    _id: "024",
    cust_id: "24",
    productsList: [
      {
        _id: "3",
        name: "OrderedTestProduct",
        price: "15",
        discount: "3.0",
        vat: 8.0,
        distributor_id: "12",
        QtyToBeBought: 1,
      },
      {
        _id: "4",
        name: "OrderedTestProduct",
        price: "15",
        discount: "3.0",
        vat: 8.0,
        distributor_id: "12",
        QtyToBeBought: 2,
      },
    ],
  },
];
