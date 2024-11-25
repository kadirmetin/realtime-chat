import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./lib/db";
import { app, server } from "./lib/socket";
import { router } from "./routes/router";

dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api", router);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);

  connectDB();
});
