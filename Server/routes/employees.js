const express = require("express");
const router = express.Router();
const supabase = require("../db");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("employees").select("*");

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching employees");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: data[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting employee");
  }
});

router.post("/", async (req, res) => {
  const { name, department, email } = req.body;

  try {
    const { data, error } = await supabase
      .from("employees")
      .insert([{ name, department, email }])
      .select();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: "Employee added successfully",
      employee: data[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding employee");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, department, email } = req.body;

  try {
    const { data, error } = await supabase
      .from("employees")
      .update({ name, department, email })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: data[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating employee");
  }
});

module.exports = router;
