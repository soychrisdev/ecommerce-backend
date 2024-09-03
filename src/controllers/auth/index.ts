import loginController from "./login.controller";
import registerController from "./register.controller";

const authController = {
  login: loginController,
  register: registerController,
};

export default authController;