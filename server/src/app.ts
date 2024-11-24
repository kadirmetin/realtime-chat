import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db";
import { router } from "./routes/router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);

  connectDB();
});
