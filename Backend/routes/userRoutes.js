import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

dotenv.config();
const userRoutes = express.Router();
// register route
userRoutes.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("---req.body----", req.body);
    const users = await userModel.find({ email });
    console.log("----users----", users);
    if (!users) {
      return res
        .status(201)
        .json({ isError: true, message: "email is already exits" });
    }
    let hashpassword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({
      name,
      email,
      password,
    });
    console.log("--newuser--", newUser);
    await newUser.save();
    return res
      .status(200)
      .json({ isError: false, message: "user register successfully" });
  } catch (error) {
    return res.status(400).json({ isError: true, message: error.message });
  }
});

// login routes
userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await userModel.findOne({ email });
    console.log("---users---", users);
    if (!users) {
      return res
        .status(201)
        .json({ isError: true, message: "please login first" });
    }
    let passCheck = bcrypt.compareSync(password, users.password);
    if (passCheck) {
      return res.status(202).json({ isError: true, message: "invalid " });
    }
    let payload = { userId: users.id, username: users.name };

    let token = jwt.sign(payload, process.env.secreteKey, { expiresIn: "9h" });
    return res.status(200).json({
      isError: false,
      message: "login successfully",
      token: token,
    });
  } catch (error) {
    res.status(400).json({ isError: true, message: error.message });
  }
});
export default userRoutes;
