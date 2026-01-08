import pool from "../config/db.js";

export const getAllProjects = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects WHERE user_id = $1 ORDER BY id DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load projects");
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM projects WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).send("Project not found");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load project");
  }
};

export const createProject = async (req, res) => {
  const { name, width, height, layers, palettes } = req.body;
  try {
    const query = `
      INSERT INTO projects (name, width, height, layers, palettes, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [
      name,
      width,
      height,
      JSON.stringify(layers),
      JSON.stringify(palettes),
      req.user.id,
    ];
    const result = await pool.query(query, values);
    res.status(201).json({ message: "Project saved!", id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to save project");
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, width, height, layers, palettes } = req.body;
  try {
    const query = `
      UPDATE projects
      SET name = $1, width = $2, height = $3, layers = $4, palettes = $5
      WHERE id = $6 AND user_id = $7
      RETURNING id;
    `;
    const values = [
      name,
      width,
      height,
      JSON.stringify(layers),
      JSON.stringify(palettes),
      id,
      req.user.id,
    ];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) return res.status(404).send("Project not found");
    res.json({ message: "Project updated!", id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update project");
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    if (result.rowCount === 0) return res.status(404).send("Project not found");
    res.json({ message: "Project deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete project");
  }
};
