import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: ObjectId,
    username: {
      type: String,
      required: true,
      min: 5,
      max: 10,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;