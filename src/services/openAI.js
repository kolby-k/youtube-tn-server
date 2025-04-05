const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
  generateThumbnail: async function ({
    title,
    topic,
    requirements,
    preferences,
    style,
  }) {
    let prompt = `Generate a youtube thumbnail image that is for a video title: ${title}. The primary topic of the video is '${topic}', ensure the thumbnail content accurately represents this topic. STYLE GUIDLINES: Always ensure the style is in ${preferences.color} and overlay text is ${preferences.text}. | REQUIREMENTS: The image generate must be PNG format. `;
    prompt = prompt + requirements;
    console.log("Prompt being used: ", prompt);
    try {
      const response = await client.images.generate({
        model: "dall-e-3",
        prompt,
        response_format: "b64_json",
        size: "1792x1024",
        style: style,
      });
      const data = response.data;
      return data;
    } catch (e) {
      console.error(
        `Error in services: openAI.generateThumbnail -- ${e?.message}`
      );
    }
  },
};
