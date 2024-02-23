import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required!").isEmail(),
    check("password", "Password is required!").isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    //   validate the user's data
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    const { email, password } = req.body;

    try {
      // getting the user to check the credentials
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Invalid Credentials" });

      // if credentials are valid then create a token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      // set the token to the user's browser cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
);

export default router;
