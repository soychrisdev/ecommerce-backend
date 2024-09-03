import mongoose, { Document } from "mongoose";

import { USER_ROLES, UserModel } from "types/types";
import userTokenModel from "./userTokenModel";

const { Schema } = mongoose;


const UserSchema = new Schema<UserModel>({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 5,
  },
  role: {
    type: String,
    required: true,
    enum: USER_ROLES,
  },
  photo: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  ventiPayId: {
    type: String,
  }
});

UserSchema.pre("findOneAndDelete", { document: true, query: true }, function middleware(next) {
  const id = this.getQuery()._id;
  userTokenModel.deleteMany({ userId: id }).exec();
  next();
});

export default mongoose.model<UserModel>("Users", UserSchema);
