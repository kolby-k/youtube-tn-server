const openAI = require("../services/openAI");
const { formatThumbnailRequest } = require("../utils/formatThumbnailRequest");

module.exports = {
  createThumbnail: async function (req, res, next) {
    const { title, topic, requirements, preferences, style } =
      formatThumbnailRequest(req.body);

    try {
      const data = await openAI.generateThumbnail({
        title,
        topic,
        requirements,
        preferences,
        style,
      });
      res.status(200).json(data);
    } catch (e) {
      console.error(
        `Error in controllers: openAI.createThumbnail -- ${e.messsage}`
      );
      next(e);
    }
  },
};

// const title = req?.body?.title || "Tariffs on Canada!";
// const topic =
//   req?.body?.topic ||
//   "How the canadian economy will be affected from 2025 tariffs imposed by Donald Trump.";
// const requirements = req?.body?.requirements || "An image of Donald Trump.";
// const { style, ...preferences } = req?.body?.preferences || {
//   text: "included",
//   color: "color",
//   style: "natural",
// };
