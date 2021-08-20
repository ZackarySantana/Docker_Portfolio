// Should have following endpoints:
//  [x] /students/id/:userid = Find student by userid
//   [] /students/id/:userid/courses = Get courses enrolled in by student with userid
//  [x] /students/all = Get all students
//   [] /students/all/:university = Get all students that attend a specific university
//  [x] /students = List endpoints

const authRequest = require("./auth/authRequest");

// /students
// Lists all the endpoints owned by the students associated endpoints
function getStudentEndpoints() {
  return function (req, res) {
    res.send({
      GetStudentByID: "/students/id/:userid",
      GetStudentCourses: "/students/id/:userid/courses",
      GetAllStudents: "/students/all",
      GetAllStudentsByUni: "/students/all/:university",
    });
  };
}

// /students/all
// Lists all students in the database
function getAllStudents(con) {
  return function (req, res) {
    con.query(
      "SELECT * FROM User WHERE IsProfessor = FALSE",
      function (err, result) {
        if (err) {
          console.error("error connecting: " + err.stack);
          res.status(500).send("Error from database: " + err.stack); // Internal server error code
          return;
        }
        res.send(result);
      }
    );
  };
}

// /students/id/:userid
// Selects a student by a specific userid
function selectStudentByID(con) {
  return function (req, res) {
    con.query(
      "SELECT * FROM User WHERE IsProfessor = FALSE AND UserID = " +
        req.params.userid,
      function (err, result) {
        if (err) {
          console.error("error connecting: " + err.stack);
          res.status(500).send("Error from database: " + err.stack); // Internal server error code
          return;
        }
        if (result.length == 1) {
          const user = {
            UserID: result[0].UserID,
            University: result[0].University,
            Email: result[0].Email,
            FirstName: result[0].FirstName,
            LastName: result[0].LastName,
            IsProfessor: result[0].IsProfessor,
          };
          res.send(user);
        } else {
          res.status(404).send("User not found"); // Bad permission
        }
      }
    );
  };
}

// /students/id/:userid/courses
// Gets the courses the student is inlisted in
function getUserCourses(con) {
  return function (req, res) {
    // TODO get the courses associated with the user
    res.send("temp");
  };
}

// Exports the endpoint manager
module.exports = function endpoint(app, con) {
  app.use("/students", authRequest(app, con));

  app.post("/students/id/:userid", selectStudentByID(con));
  app.post("/students/id/:userid/courses", getUserCourses(con));
  app.post("/students/all", getAllStudents(con));
  app.post("/students", getStudentEndpoints(con));
};
