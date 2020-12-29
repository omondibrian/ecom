import User from "../../../../../services/users_service/service_repository/models/user.modal";
import { AddVendorUsecase } from "../../../../../services/users_service/usecase/addVendor";
import UsersTestRepository from "../../../../__mocks__/IuserRepo";

const testRepo = new UsersTestRepository();
//new vendor object
const Vendor: UsersService.IVendorEntity = {
  user_id: 1,
  name: "TestVendor",
  Address: {
    street_address_1: "testStreet",
    street_address_2: null,
    P_O_BOX: "536-20115 TestArea",
    city: {
      name: "Nairobi",
    },
    country: {
      name: "Kenya",
    },
  },
  logo_url: "/logo.jpg",
  email: "testVendor.co.ke",
  description: "testVendor we deel in test Products",
};
describe("AddVendorUsecase", () => {
  const addVendor = new AddVendorUsecase(testRepo);

  describe("AddVendorUsecase.add()", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      const mockUpdate = jest.spyOn(testRepo, "addNewVendor");
      mockUpdate.mockImplementation(async() => {
        return {
          user_id: 1,
          name: "TestVendor",
          Address: {
            street_address_1: "testStreet",
            street_address_2: null,
            P_O_BOX: "536-20115 TestArea",
            city: {
              name: "Nairobi",
            },
            country: {
              name: "Kenya",
            },
          },
          logo_url: "/logo.jpg",
          email: "testVendor.co.ke",
          description: "testVendor we deel in test Products",
        };
      });
    });

    it("should successfully add a new vendor", async () => {
      const result = await addVendor.add(Vendor)
      expect(result).toStrictEqual<UsersService.IVendorModel>(Vendor);
    });
  });

 
});
