import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import propertyRoute from "./routes/property.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
export const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: process.env.POSTGRE_PASS,
  database: "fake-e-commerce",
});
db.connect();

app.use("/api/properties", propertyRoute);

app.listen(PORT, () => {
  console.log(`its listening on port ${PORT}`);
});
