import { pool } from "../db.js";

export const createUserQuery = async (
  firstName,
  lastName,
  profile_img,
  username,
  password
) => {
  try {
    const [rows] = await pool.query(
      `INSERT INTO user (first_name, last_name, profile_img, username, password) VALUES (?, ?, ?, ?, ?)`,
      [firstName, lastName, profile_img, username, password]
    );
    return rows[0];
  } catch (error) {
    
  }
};

export const getUserQuery = async (id) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM user WHERE id = ?`, [id]);
  } catch (error) {
    console.log(error);
  }
};
