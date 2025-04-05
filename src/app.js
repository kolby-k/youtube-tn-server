const express = require("express");
const cors = require("cors");
const openAIRouter = require("./routes/openAI");

const app = express();

/* Middleware */
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log(`NEW REQUEST: ${req.url}`);
  console.log(`- METHOD: ${req.method}`);
  console.log(`- BODY: ${JSON.stringify(req.body, null, 3)}`);
  next();
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(`${process.env.SERVER_BASE_URL}/openai`, openAIRouter());

app.use((err, req, res, next) => {
  console.error("Error stack:", err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

module.exports = app;
