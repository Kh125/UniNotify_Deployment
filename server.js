require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require('path')
const cookieParser = require("cookie-parser");
const router = express.Router();

const routes = require("./routes/routes");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"dist")))

routes(router);
app.get("/", (req, res) => {
  // res.json({ message: "Welcome to App" });
  res.status(200).sendFile(path.join("index.html"))
});

app.use("/api/routes", router);
  
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listing on port 4000!!!");
    });
  })
  .catch((e) => {
    console.log("Can't connect to MongoDB!", e);
  });
