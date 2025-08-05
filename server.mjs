import dotenv from "dotenv";
dotenv.config();

import express from "express";
import dbConnection from "./database/db.mjs";
import authRoute from "./routes/auth-route.mjs";
import homeRoute from "./routes/home-route.mjs";

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use(express.json());
app.use("/auth", authRoute);
app.use("/home", homeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
