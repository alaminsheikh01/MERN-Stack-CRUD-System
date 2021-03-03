const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// import routes
const portRoutes = require("./routes/postRoutes");

// app
const app = express();

// database connect
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB conntected");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// route middleware
app.use("/api", portRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`your server is runnig on port ${port}`);
});
