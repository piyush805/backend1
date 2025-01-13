import bcrypt from "bcrypt";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";

import {
  createUserQuery,
  getUserQuery,
  updateUserQuery,
  checkAvailabilityQuery,
} from "./db.js";

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const checkAvailability = async (req, res) => {
  try {
    const usernameValue = req.body.username;

    if (!usernameValue) {
      throw new Error(
        JSON.stringify({ statusCode: 400, message: "Missing required fields" })
      );
    }

    const isAvailable = await checkAvailabilityQuery(usernameValue);
    return res.json(
      new ApiResponse(200, "User name available", { isAvailable })
    );
  } catch (error) {
    logger.error("[user/controller.js] Failed to username availability", {
      error,
    });
    res.json(new ApiError(error));
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    if (!firstName || !lastName || !username || !password) {
      throw new ApiError(400, "Missing required fields");
    }

    const hashedPassword = getHashedPassword(password);

    const [rows] = await createUserQuery(
      firstName,
      lastName,
      profile_img,
      username,
      hashedPassword
    );

    return res.json(new ApiResponse(200, "User created successfully", rows[0]));
  } catch (error) {
    logger.error("[user/controller.js] Failed to create user", { error });
    return res.json(new ApiError(error));
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Missing required fields");
    }

    const [rows] = await getUserQuery(id);

    return res.json(new ApiResponse(200, "User found successfully", rows[0]));
  } catch (error) {
    logger.error("[user/controller.js] Failed to get user", { error });
    return res.json(new ApiError(error));
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check if user exists
    const [rows] = await getUserQuery(id);
    if (!rows[0]) {
      throw new ApiError(404, "User not found");
    }

    const { firstName, lastName, profile_img, username, password } = req.body;
    // all parameters are optional

    let hashedPassword = null;
    if (password) {
      hashedPassword = getHashedPassword(password);
    }

    await updateUserQuery(
      id,
      firstName,
      lastName,
      profile_img,
      username,
      hashedPassword || null
    );

    return res.json(new ApiResponse(200, rows[0], "User updated successfully"));
  } catch (error) {
    logger.error("[user/controller.js] Failed to update user", { error });
    return res.json(new ApiError(error));
  }
};
