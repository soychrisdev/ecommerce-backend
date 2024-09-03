import checkOutsController from "./checkouts.controller";
import checkOutsByIdController from "./createCheckout.controller";
import createCheckOutController from "./createCheckout.controller";

const checkOutsControllers = {
  checkouts: checkOutsController,
  checkoutsById: checkOutsByIdController,
  createCheckout: createCheckOutController,
};

export default checkOutsControllers;