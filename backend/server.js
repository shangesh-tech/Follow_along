require("dotenv").config();

const connectDatabase = require('./db/Database.js')
const app = require("./app.js")
const PORT = process.env.PORT;

// Connecting to the database
const server = app.listen(PORT,async()=>{
  connectDatabase();
  console.log(f`The server is running on Port:${PORT} URL: http://localhost:${PORT}`);
});