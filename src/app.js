const express = require("express");
const cors = require("cors");

const app = express();

/* Middleware */
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`NEW REQUEST: ${req.url}`);
  console.log(`- METHOD: ${req.method}`);
  console.log(`- PARAMS: ${JSON.stringify(req.params, null, 3)}`);
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).json({ status: "success" });
});

module.exports = app;
