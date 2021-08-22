// Library imports
const express = require("express");
const app = express();
const sql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Import different endpoint managers
const user = require("./user");
const professor = require("./professor");
const course = require("./course");
const login = require("./auth/login");

// Create MySQL connection
const con = sql.createConnection({
  host: "database",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Add default route to send the main endpoints
app.get("/", (req, res) => {
  res.send({
    users: "/users",
    professors: "/professors",
    courses: "/courses",
  });
});

// Register the endpoint managers with the express connection and mysql connection
user(app, con);
//professor(app, con);
//course(app, con);

// Register specific endpoint managers
login(app, con);

// Makes application listen on appropriate port
app.listen(process.env.PORT || 8081, () => {
  console.log(`Starting express server...`);
});
