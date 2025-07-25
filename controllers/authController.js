import User from "../models/userModel.js";
import { createJWT } from "../utils/createJWT.js";
import { generate } from "otp-generator";
import { loadTemplate } from "../utils/loadTemplate.js";
import { sendEmail } from "../services/emailService.js";
import crypto from "crypto";

export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists!", success: false });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = createJWT({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    // const cookieOptions = {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // };

    res
      .status(201)
      .json({ message: "Signup successful!", token, user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

// Login:
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    console.log(email, password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }

    const token = createJWT({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    // const cookieOptions = {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // };

    return res
      .status(200)
      .json({ message: "Login successfully!", token, success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

//Forget Password Controller
export const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required!",
      });
    }

    const user = await User.findOne({ email });
    console.log(user.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist!",
      });
    }

    const otp = generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Hashed the otp:
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    user.resetPasswordOtp = hashedOtp;
    user.resetPasswordOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    const year = new Date().getFullYear();
    const html = loadTemplate("resetPasswordEmail.html", {
      name: user.name || "User",
      otp,
      year,
    });

    await sendEmail({
      to: user.email,
      subject: "Reset Your Password",
      html,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email address",
    });
  } catch (error) {
    console.error("Forget Password Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Verify Reset OTP:
export const verifyResetOTPController = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    if (!otp) return res.status(400).json({ message: "OTP is required!" });
    if (!newPassword)
      return res.status(400).json({ message: "New password is required!" });
    if (!otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "OTP and new password is requried" });
    }

    const hashedInputOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordOtp: hashedInputOtp,
      resetPasswordOtpExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(403).json({
        message: "Invalid or expired OTP",
        success: false,
      });
    }

    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpireAt = undefined;
    await user.save();

    return res.status(200).json({
      message: "Successfully changed password",
      success: true,
    });
  } catch (error) {
    console.error("Reset OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// CHANGE EMAIL:
export const requestChangeEmailController = async (req, res) => {
  try {
    const { newEmail, password } = req.body || {};
    if (!newEmail) {
      return res
        .status(400)
        .json({ message: "New email is required", success: false });
    }
    const existingEmail = await User.findOne({ email: newEmail });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already taken!" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }
    const currentEmail = req.user.email;
    console.log("currentEmail", currentEmail);

    const user = await User.findOne({ email: currentEmail }).select(
      "+password"
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }

    // Generate OTP:
    const otp = generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Store in user:
    user.newEmail = newEmail;
    user.emailChangeOtp = hashedOtp;
    user.emailChangeOtpExpireAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    const html = loadTemplate("emailChangeOtp.html", {
      name: user.name || "User",
      otp,
      year: 2025,
    });

    await sendEmail({ to: newEmail, subject: "Change Email OTP", html });
    return res
      .status(200)
      .json({ message: "OTP send to new email successfully!", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const verifyChangeEmailController = async (req, res) => {
  try {
    const { otp } = req.body;
    const currentEmail = req?.user?.email;
    if (!otp) {
      return res
        .status(400)
        .json({ message: "OTP is required!", success: false });
    }
    const hashedInputOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const user = await User.findOne({
      email: currentEmail,
      emailChangeOtp: hashedInputOtp,
      emailChangeOtpExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid bearer token or expired OTP",
        success: false,
      });
    }

    const newEmail = user.newEmail;
    const oldEmail = user.email;

    user.email = newEmail;
    user.newEmail = undefined;
    user.emailChangeOtp = undefined;
    user.emailChangeOtpExpireAt = undefined;

    req.user.email = newEmail;

    await user.save();

    const newEmailMail = loadTemplate("email-change-new.html", { year: 2025 });
    const oldEmailMail = loadTemplate("email-change-old.html", { year: 2025 });

    await sendEmail({
      to: newEmail,
      subject: "✅ Your email address was updated successfully",
      html: newEmailMail,
    });
    await sendEmail({
      to: oldEmail,
      subject: "⚠️ Your email address was changed",
      html: oldEmailMail,
    });

    const token = createJWT({
      _id: user._id,
      email: newEmail,
      role: user.role,
    });

    return res
      .status(200)
      .json({ message: "Email change successfully", success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }
    if (!newPassword) {
      return res
        .status(400)
        .json({ message: "New password is required", success: false });
    }
    const email = req?.user?.email;
    console.log(email);

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });
    }
    user.password = newPassword;
    await user.save();
    return res
      .status(200)
      .json({ message: "Successfully update password!", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const verifyTokenController = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Token is verified", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Logout:
// export const logoutController = async (req, res) => {
//   try {
//     return res
//       .status(200)
//       .cookie("token", "", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "Lax",
//         maxAge: 0,
//       })
//       .json({ message: "Logout successfully!", success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message, success: false });
//   }
// };
