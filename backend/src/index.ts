import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/text", async (req: Request, res: Response) => {
  res.send({ message: "Hello from express endpoint!" });
});

app.listen(3000, () => console.log("server is running on port 3000"));
