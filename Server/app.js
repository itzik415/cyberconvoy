const express = require("express");
const employeeRoutes = require("./routes/employees");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/employees", employeeRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
