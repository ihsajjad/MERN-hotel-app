import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
import User from "../models/user";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(400).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post(
  "/register",
  [
    check("email", "Email is required!").isEmail(),
    check("password", "Password is requied!").isLength({ min: 6 }),
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    // console.log("object");
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        res.status(400).json({ message: "User already exists" });
      } else {
        user = new User(req.body);
        console.log(user);
        user.save();

        // create jwt token to send to the user's browser
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY as string,
          {
            expiresIn: "1d",
          }
        );

        // send token as cookie to the user
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400000,
        });
        res.status(200).send({ message: "Account was created successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
);

export default router;
