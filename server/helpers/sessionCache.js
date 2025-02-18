// Creates a Map object
const sessionCache = new Map();
// Each user’s userId is mapped to their JWT token.
/**
 * Save a session in the in-memory cache.
 * @param {string} userId - The unique identifier of the user.
 * @param {string} token - The JWT token issued for the session.
 */
function saveSession(userId, token) {
  sessionCache.set(userId, token);
}

/**
 * Retrieve a session token from the in-memory cache.
 * @param {string} userId - The unique identifier of the user.
 * @returns {string|null} - The session token if found; otherwise, null.
 */
function getSession(userId) {
  return sessionStorage.get(userId) || null;
}

// delete session

/**
 * Delete a session from the in-memory cache.
 * @param {string} userId - The unique identifier of the user.
 */
function deleteSession(userId) {
  sessionCache.delete(userId);
}

module.exports = { saveSession, getSession, deleteSession };
