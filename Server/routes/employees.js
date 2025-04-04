const express = require("express");
const router = express.Router();
const client = require("../db");

router.get("/", async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM "employees"`);
    res.json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching employees");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query(
      `DELETE FROM "employees" WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting employee");
  }
});

router.post("/", async (req, res) => {
  const { name, department, email } = req.body;
  try {
    const result = await client.query(
      `INSERT INTO "employees" (name, department, email) VALUES ($1, $2, $3) RETURNING *`,
      [name, department, email]
    );

    res.status(201).json({
      message: "Employee added successfully",
      employee: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding employee");
  }
});

router.put("/:id", async (req, res) => {
  const { id, name, department, email } = req.body;
  try {
    const result = await client.query(
      `UPDATE "employees" SET name = $1, department = $2, email = $3 WHERE id = $4 RETURNING *`,
      [name, department, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating employee");
  }
});

module.exports = router;
