import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
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
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

export default router;
