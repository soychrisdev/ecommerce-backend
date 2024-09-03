import dotenv from "dotenv";
import { env } from "../utils/env";

export const config = {
  API_VERSION: "v1",
  salt: 10,

  // jwt parameters
  refreshTokenPrivateKey: "secret",
  accessTokenPrivateKey: "secret",
  refreshTokenExpiration: "10h",
  accessTokenExpiration: "10h",

  // token parameters
  refreshTokenName: "refreshToken",
  cookieDomain: "localhost",

  // database
  databaseUrl: "mongodb://ventistore:123456@localhost:27017/ventistore",
  databaseUser: "ventistore",
  databasePassword: "123456",

  VENTI_SECRET_KEY: "secret",
  VENTI_PUBLIC_KEY: "secret",
  VENTI_API_URL: "https://api.ventipay.com/v1",


};

export const loadConfigVariables = () => {
  // loading .env and .env.local
  dotenv.config();
  dotenv.config({ path: ".env.local" });

  config.salt = env("SALT", config.salt) as number;

  // jwt parameters
  config.refreshTokenPrivateKey = env(
    "REFRESH_TOKEN_PRIVATE_KEY",
    config.refreshTokenPrivateKey,
  ) as string;
  config.accessTokenPrivateKey = env(
    "ACCESS_TOKEN_PRIVATE_KEY",
    config.accessTokenPrivateKey,
  ) as string;
  config.refreshTokenExpiration = env(
    "REFRESH_TOKEN_EXPIRATION",
    config.refreshTokenExpiration,
  ) as string;
  config.accessTokenExpiration = env(
    "ACCESS_TOKEN_EXPIRATION",
    config.accessTokenExpiration,
  ) as string;

  // token parameters
  config.cookieDomain = env("COOKIE_DOMAIN", config.cookieDomain) as string;

  // database
  config.databaseUrl = env("DATABASE_URL", config.databaseUrl) as string;
  config.databaseUser = env("DATABASE_USER", config.databaseUser) as string;
  config.databasePassword = env("DATABASE_PASSWORD", config.databasePassword) as string;

  config.VENTI_SECRET_KEY = env("VENTI_SECRET_KEY", config.VENTI_SECRET_KEY) as string;
  config.VENTI_PUBLIC_KEY = env("VENTI_PUBLIC_KEY", config.VENTI_PUBLIC_KEY) as string;
  config.VENTI_API_URL = env("VENTI_API_URL", config.VENTI_API_URL) as string;

};

export default loadConfigVariables;
