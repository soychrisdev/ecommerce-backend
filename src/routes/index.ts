import { config } from "../config/index";
import { Application } from "express";
import authRoutes from "./auth.route";
import ventiRoutes from "./ventipay.route"
import userRoutes from "./user.route"
const { API_VERSION } = config;

/*
 * Routes registration
 */
const routes = (app: Application) => {
  const apiPrefix = `/api/${API_VERSION}`;
  console.log('apiPrefix', apiPrefix);
  // use the same route for both /hello and /api/v1/hello
  // app.use(helloRoutes);
  app.use(`${apiPrefix}/auth`, authRoutes);

  app.use(`${apiPrefix}/ventipay`, ventiRoutes);

  app.use(`${apiPrefix}/user`, userRoutes);

  // authentication routes
  // app.use(authRoutes);

  // protected routes
  // app.use(apiPrefix, protectedRoutes);

  // admin routes
  // app.use(`${apiPrefix}/admin`, adminRoutes);

  // protected routes
  // app.use(apiPrefix, dataRoutes);

  return app;
};

export default routes;