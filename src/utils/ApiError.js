import logger from "./logger";

export default class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message || "Something went wrong. Please try again.";
    this.success = false; // Success flag to be always false in api error
    this.errors = [];

    if (error.stack) {
      this.stack = error.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 200: OK (for successful reads).
 * 201: Created (for successful writes).
 * 204: No Content (for successful deletes).
 *
 * 400: Bad Request (for validation errors).
 * 401: Unauthorized (for missing or invalid authentication).
 * 403: Forbidden (for invalid permissions).
 * 404: Not Found (for missing resources).
 * 429: Too Many Requests (for rate-limiting errors).
 *
 * 500: Internal Server Error (for unexpected failures).
 * 501: Not Implemented (for unimplemented features).
 * 502: Bad Gateway (for bad gateway errors).
 * 503: Service Unavailable (for temporary overloading or maintenance).
 */
