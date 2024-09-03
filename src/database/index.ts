import mongoose from "mongoose";

import { config } from "../config";

export const connectMongoDB = async () => {
  const { databaseUrl, databaseUser, databasePassword } = config;

  mongoose.connection

    .on(
      "error",
      /* istanbul ignore next */
      err => console.error(err.message),
    )
    .on("disconnected", connectMongoDB)
    .once(
      "open",
      /* istanbul ignore next */
      () => console.info(`MongoDB connected to ${databaseUrl}`),
    );

  await mongoose.connect(databaseUrl, {
    user: databaseUser,
    pass: databasePassword,
  });
};

export default connectMongoDB;