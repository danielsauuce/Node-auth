import dotenv from "dotenv";
dotenv.config();

import express from "express";
import dbConnection from "./database/db.mjs";
import authRoutes from "./routes/auth-route.mjs";

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
