import { pool } from "../db.js";
import ApiError from "../utils/ApiError.js";

export const createUserQuery = async (
  firstName,
  lastName,
  profile_img,
  username,
  password
) => {
  const [rows] = await pool.query(
    `INSERT INTO user (first_name, last_name, profile_img, username, password) VALUES (?, ?, ?, ?, ?)`,
    [firstName, lastName, profile_img, username, password]
  );
  return rows[0];
};

export const getUserQuery = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM user WHERE id = ?`, [id]);
  return rows[0];
};

export const updateUserQuery = async (
  id,
  firstName,
  lastName,
  profileImg,
  username,
  password
) => {
  const updateFields = [];
  const values = [];

  if (firstName) {
    updateFields.push("first_name = ?");
    values.push(firstName);
  }
  if (lastName) {
    updateFields.push("last_name = ?");
    values.push(lastName);
  }
  if (profileImg) {
    updateFields.push("profile_img = ?");
    values.push(profileImg);
  }
  if (username) {
    updateFields.push("username = ?");
    values.push(username);
  }
  if (password) {
    updateFields.push("password = ?");
    values.push(password);
  }

  if (updateFields.length === 0) {
    throw new ApiError(400, "No fields provided to update");
  }

  values.push(id); // Add `id` to the end for the WHERE clause

  const [result] = await pool.query(
    `UPDATE user SET ${updateFields.join(", ")} WHERE id = ?`,
    values
  );
  if (result.affectedRows === 0) {
    throw new ApiError(404, `User with ID ${id} not found`);
  }
  return { affectedRows: result.affectedRows };
};

export const checkAvailabilityQuery = async (username) => {
  const [rows] = await pool.query(`SELECT id FROM user WHERE username = ?`, [
    username,
  ]);
  return rows.length === 0;
};
