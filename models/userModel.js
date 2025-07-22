import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name at least contain 3 characters"],
      maxlength: [50, "Name must be less then 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetPasswordOtp: {
      type: String,
      select: false,
    },
    resetPasswordOtpExpireAt: {
      type: Date,
      select: false,
    },
    newEmail: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    emailChangeOtp: {
      type: String,
      select: false,
    },
    emailChangeOtpExpireAt: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log("candidatePassword", candidatePassword);
  console.log("this.password", this.password);

  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
