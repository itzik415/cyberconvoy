require("dotenv").config();
const pg = require("pg");
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: false,
});

client.connect();

module.exports = client;
