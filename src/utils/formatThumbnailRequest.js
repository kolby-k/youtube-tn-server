// utils/thumbnail.js
const createError = require("http-errors");

/**
 * @typedef {Object} ThumbnailRequest
 * @property {string}  title        - Human‑readable title (3‑100 chars)
 * @property {string}  topic        - Abritrary topic
 * @property {string} requirements-  String of hard requirements (non‑empty)
 * @property {Object}  preferences  - Arbitrary JSON object with soft prefs
 */

/**
 * Normalises and validates an incoming thumbnail request.
 * Can be used as a pure function or wired into Express middleware.
 *
 * @param {Object} source - Either `req.body` from Express or a plain object
 * @returns {ThumbnailRequest}
 * @throws {HttpError} 400 if any field is missing or invalid
 */
function formatThumbnailRequest(source) {
  // 1. Null / undefined guard
  if (!source) {
    throw createError(400, "Request body is empty");
  }

  // 2. Destructure (works for plain objects *and* Express req.body)
  const { title, topic, requirements, preferences } = source;

  // 3. Field‑level validation
  if (
    typeof title !== "string" ||
    !title.trim() ||
    title.length < 3 ||
    title.length > 100
  ) {
    throw createError(400, 'Field "title" must be 3‑100 non‑blank characters');
  }

  if (
    typeof topic !== "string" ||
    !topic.trim() ||
    topic.length < 3 ||
    topic.length > 255
  ) {
    throw createError(400, 'Field "topic" must be 3-255 characters');
  }

  if (typeof requirements !== "string" || requirements.length > 255) {
    throw createError(
      400,
      'Field "requirements" must be fewer than 255 characters'
    );
  }

  if (
    typeof preferences !== "object" ||
    preferences === null ||
    !preferences?.style === "natural" ||
    !preferences?.style === "vivid" ||
    Array.isArray(preferences)
  ) {
    throw createError(400, 'Field "preferences" must be a plain JSON object');
  }

  const { style, ...preferencesObj } = preferences;

  // 4. Sanitise & return a predictable shape
  return {
    title: title.trim(),
    topic: topic.trim(),
    requirements: requirements.trim(),
    preferences: preferencesObj,
    style,
  };
}

module.exports = { formatThumbnailRequest };
