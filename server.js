import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import connectDB from "./config/dbConnect.js";
import compression from "compression";
import helmet from "helmet";
import errorHandler from "./utils/errorHandler.js";
dotenv.config();

import leadRoute from "./routes/leadRoute.js";
import blogRoute from "./routes/blogRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));
app.use(
  "/uploads",
  express.static(path.join(path.resolve(), "public/uploads")),
);

// Routes
app.use("/api/leads", leadRoute);
app.use("/api/blog", blogRoute);

// Error Handler
app.use(errorHandler);
const serverStart = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

serverStart();
