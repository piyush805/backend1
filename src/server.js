import express from "express";
import { pool } from "./db.js"; // Import the database module
import { allowOriginMiddleware } from "./middleware.js";
import ApiResponse from "./utils/ApiResponse.js";
import ApiError from "./utils/ApiError.js";
import logger from "./utils/logger.js";

const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Apply the allowOriginMiddleware before the router
app.use(allowOriginMiddleware);

// Sample route
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM user`);

    return res.status(200).json(new ApiResponse(200, rows[0], "Hello World!"));
  } catch (error) {
    return new ApiError(500, "Database query failed", error.message);
  }
});

export default app; // Export the app for use in index.js
