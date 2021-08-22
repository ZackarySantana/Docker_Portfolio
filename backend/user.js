// Should have following endpoints:
//  [x] /users/id/:userid = Find user by userid
//  [x] /users/all = Get all users
//   [] /users/all/:university = Get all users that attend a specific university
//  [x] /users = List endpoints

const authRequest = require("./auth/authRequest");
const getUserIDFromToken = require("./auth/getUserIDFromToken");

// /users
// Lists all the endpoints owned by the users associated endpoints
function getUserEndpoints() {
  return function (req, res) {
    res.send({
      GetUserByID: "/users/id/:userid",
      GetUserCourses: "/users/id/:userid/courses",
      GetAllUsers: "/users/all",
      GetAllUsersByUni: "/users/all/:university",
    });
  };
}

// /users/all
// Lists all users in the database
function getAllUsers(con) {
  return function (req, res) {
    con.query(
      "SELECT * FROM User",
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

// /users/id/:userid
// Selects a user by a specific userid
function selectUserByID(con) {
  return function (req, res) {
    getUserIDFromToken(con, req.body.Token).then(UserID => {
      let allowed = false;
      if (req.params.userid === UserID) {
        allowed = true;
      } else {

      }
      con.query(
        "SELECT * FROM User WHERE UserID = " +
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
            };
            res.send(user);
          } else {
            res.status(404).send("User not found"); // Bad permission
          }
        }
      );
    });
  }
}

// Exports the endpoint manager
module.exports = function endpoint(app, con) {
  app.use("/users", authRequest(con));

  app.post("/users/id/:userid", selectUserByID(con));
  app.post("/users/all", getAllUsers(con));
  app.post("/users", getUserEndpoints(con));
};
