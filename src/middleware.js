import { allowedOrigins } from "../config.js";

export const allowOriginMiddleware = (req, res, next) => {
  const origin = req.headers.origin; // Use Origin if available, fallback to Host
  if (allowedOrigins.includes(origin)) {
    // Set CORS headers if the origin is allowed
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    next(); // Proceed to the next middleware or route
  } else {
    // Deny the request if the origin is not allowed
    res.status(403).json({ error: "Access denied. Origin not allowed." });
  }
};
