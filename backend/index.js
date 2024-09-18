import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import { sequelize } from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
