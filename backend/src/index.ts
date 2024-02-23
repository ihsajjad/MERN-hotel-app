import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";

mongoose
  .connect(process.env.MONGODB_UR as string)
  .then(() => console.log("db is connected successfully"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("server is running on port 3000"));
