const dotenv = require("dotenv");
const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const connectToDB = require("./middlewares/dbConnect.js");
// const indexRouter = require("./routes/index.routes.js");
// const testRouter = require("./routes/test.routes.js");

const indexRouter = require("./routes/user.route.js");
dotenv.config({ path: "./config/config.env" }); // Adjust the path as needed

// Create an Express app
const app = express();
const port = process.env.PORT || 8080;
// const { createAdminUserIfNotExist } = require("./utils/adminUtils.js");



// Connect to MongoDB
connectToDB();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow requests from any origin
app.use(helmet()); // Enhance security by setting various HTTP headers

app.use(morgan("dev")); // Log HTTP requests
app.use(bodyParser.json()); // Parse request bodies for JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse request bodies for x-www-form-urlencoded


// Routes
// app.use("/api", indexRouter);
// app.use("/", testRouter);
app.use("/api/auth", indexRouter);

app.use((err, rea, res, next) => {
  const errorStatus = err.code || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json(errorMessage);
});
// Create admin user if not exist
// createAdminUserIfNotExist();

app.listen(port, () => {
  console.log(`Server listening successfully on http://localhost:${port}`);
});