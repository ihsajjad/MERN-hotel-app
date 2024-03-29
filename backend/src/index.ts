import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import authRoutes from "./routes/auth";
import hotelRoutes from "./routes/hotels";
import myBookingsRoute from "./routes/my-bookings";
import myHotelRoutes from "./routes/my-hotels";
import usersRoutes from "./routes/users";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("db is connected successfully"))
  .catch((err) => console.log(err));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_UEL, credentials: true }));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", myBookingsRoute);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(3000, () => console.log("server is running on port 3000"));
