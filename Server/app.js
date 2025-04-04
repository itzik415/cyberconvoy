const express = require("express");
const client = require("./db");
const employeeRoutes = require("./routes/employees");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/employees", employeeRoutes);

process.on("SIGINT", async () => {
  await client.end();
  console.log("Disconnected from database");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await client.end();
  console.log("Disconnected from database");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
