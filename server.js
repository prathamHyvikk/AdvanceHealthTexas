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

import leadRouter from "./routes/leadRoute.js";
import blogRouter from "./routes/blogRoute.js";
import adminRouter from "./routes/adminRoute.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.0.39:5173",
      "https://advancehealthtexas.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
// app.use(
//   helmet({
//     crossOriginResourcePolicy: {
//       policy: "cross-origin",
//     },
//   }),
// );
app.use(compression());
app.use(morgan("combined"));
app.use(express.static(path.join(path.resolve(), "public")));

app.get("/", (req, res) => {
  res.send("Server is running");
});
// Routes
app.use("/api/leads", leadRouter);
app.use("/api/blog", blogRouter);
app.use("/api/admin", adminRouter);

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
