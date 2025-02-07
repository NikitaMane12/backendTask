import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./confilg/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRouter from "./routes/TaskRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/task", taskRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connect;
    console.log("mongodb is conneted");
    console.log("server is running on port");
  } catch (error) {
    console.log("-----error---", error);
  }
});
