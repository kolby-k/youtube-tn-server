const express = require("express");
const openAI = require("../controllers/openAI");

module.exports = () => {
  const router = express.Router();

  router.post("/thumbnails/youtube", openAI.createThumbnail);

  return router;
};
