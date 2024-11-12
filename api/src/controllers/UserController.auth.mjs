import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/User.mjs";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username cannot be empty!" });
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password must be provided!" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, passwordHash });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    res.json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};

export const validateToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed." });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({ message: "Token is valid.", decoded });
  } catch (error) {
    console.error("Error validating token:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }

    return res.status(401).json({ message: "Invalid token." });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a reset token and expiration time
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour

    // Save the token and expiration in the database
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    // In a real app, send an email with the reset token
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({
      message:
        "Password reset token generated. Check your email for further instructions.",
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({
      message: "An error occurred while requesting the password reset.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { [Op.gt]: new Date() }, // Token must be valid
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting the password." });
  }
};
