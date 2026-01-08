import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Register Attempt:", { username, email, password });

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate Email Format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate Password Strength
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }
  // Check for at least one number
  if (!/\d/.test(password)) {
    return res
      .status(400)
      .json({ message: "Password must contain at least one number" });
  }

  try {
    // Check for existing User or Email
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userCheck.rows.length > 0) {
      const existing = userCheck.rows[0];
      if (existing.username === username)
        return res.status(400).json({ message: "Username already taken" });
      if (existing.email === email)
        return res.status(400).json({ message: "Email already registered" });
    }

    // Hash & Save
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username",
      [username, email, hashedPassword]
    );

    // Generate Token
    const token = jwt.sign(
      { id: newUser.rows[0].id, username: newUser.rows[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(201)
      .json({ message: "User registered", token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
