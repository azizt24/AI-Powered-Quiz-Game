// server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import connect from "../server/database/conn.js";
import qaRoute from "../server/routes/qaRoute.js";

const app = express();

const LOGGING_FORMAT = "tiny";
const PORT = process.env.PORT || 4000;
const API_PREFIX = "/api";

app.use(morgan(LOGGING_FORMAT));
app.use(cors());
app.use(express.json());
config();

app.use(API_PREFIX, qaRoute);

app.get("/", (req, res) => {
  res.json("Get Request");
});

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected to http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Invalid Database Connection");
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
