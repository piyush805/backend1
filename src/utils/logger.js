// utils/logger.js
import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, json } = format;

// Define the custom log format for console output
const consoleFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length
    ? JSON.stringify(meta, null, 2)
    : "";
  return `[${timestamp}] ${level}: ${message} ${metaString}`;
});

// Create the logger instance
const logger = createLogger({
  level: "debug", // Default logging level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }) // Adds a timestamp to all logs
  ),
  transports: [
    // Console transport with colorized output and custom format
    new transports.Console({
      format: combine(colorize(), consoleFormat),
    }),

    // File transport for error logs in JSON format
    new transports.File({
      filename: "logs/error.log",
      level: "error",
      format: json(), // Logs errors in JSON format
    }),

    // File transport for all logs in JSON format
    new transports.File({
      filename: "logs/combined.log",
      format: json(), // Logs all messages in JSON format
    }),
  ],
});

// Export the logger
export default logger;
