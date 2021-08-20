const md5 = require("md5");
const crypto = require("crypto");

function loginCred(con) {
  return function (req, res) {
    if (req.body && req.body.email && req.body.password) {
      con.query(
        `SELECT * FROM User WHERE Email = '${req.body.email}'
        AND Password = '${md5(req.body.password)}'`,
        function (err, result) {
          if (err) {
            console.error("error connecting: " + err.stack);
            res.status(500).send("Error connecting to database: " + err.stack);
            return;
          }
          if (result.length == 1) {
            var token = crypto.randomBytes(64).toString("hex");
            const user = {
              UserID: result[0].UserID,
              University: result[0].University,
              Email: result[0].Email,
              FirstName: result[0].FirstName,
              LastName: result[0].LastName,
              IsProfessor: result[0].IsProfessor,
              Token: token,
            };
            con.query(
              `REPLACE INTO Auth (UserID, Token) VALUES (${result[0].UserID}, '${token}')`,
              function (err, result) {
                if (err) {
                  console.error("error connecting: " + err.stack);
                  res.send("Error generating token: " + err.stack);
                  return;
                }
                res.send(user);
              }
            );
          } else {
            res.status(401).end(); // User not found
          }
        }
      );
    } else {
      res.status(401).end(); // Invalid credentials code
    }
  };
}

function loginToken(con) {
  return function (req, res) {
    if (req.body.Token) {
      con.query(
        `SELECT * FROM Auth WHERE Token = '${req.body.Token}'`,
        function (err, result) {
          if (err) {
            console.error("error connecting: " + err.stack);
            return;
          }
          if (result.length > 0) {
            con.query(
              `SELECT * FROM User WHERE UserID = '${result[0].UserID}'`,
              function (err, result) {
                if (err) {
                  console.error("error connecting: " + err.stack);
                  res
                    .status(500)
                    .send("Error connecting to database: " + err.stack);
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
                    Token: req.body.Token,
                  };
                  res.send(user);
                } else {
                  res.status(404).send("User not found"); // Bad permission
                }
              }
            );
          } else {
            res.status(403).end(); // Bad permission
          }
        }
      );
    } else {
      res.status(403).end(); // Bad permission
    }
  };
}

module.exports = function endpoint(app, con) {
  app.post("/login", loginCred(con));
  app.post("/auth", loginToken(con));
};
