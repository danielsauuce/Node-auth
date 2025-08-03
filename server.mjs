import dotenv from "dotenv";
dotenv.config();

import express from "express";
import dbConnection from "./database/db.mjs";

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
