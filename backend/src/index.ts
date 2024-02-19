import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_UR as string)
  .then(() => console.log("db is connected successfully"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/text", async (req: Request, res: Response) => {
  res.send({ message: "Hello from express endpoint!" });
});

app.listen(3000, () => console.log("server is running on port 3000"));
