import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createUserQuery } from "./db.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, profile_img, username, password } = req.body;

    if (!firstName || !lastName || !username || !password) {
      throw new ApiError(400, "Missing required fields");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [rows] = await createUserQuery(
      firstName,
      lastName,
      profile_img,
      username,
      hashedPassword
    );

    return ApiResponse(200, {
      message: "User created successfully",
      data: rows[0],
    });
  } catch (error) {
    return new ApiError(500, "Database query failed", error.message);
  }
};
