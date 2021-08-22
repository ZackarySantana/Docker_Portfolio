module.exports = function authRequest(con) {
  return function (req, res, next) {
    if (req.body.Token) {
      con.query(
        `SELECT * FROM Auth WHERE Token = '${req.body.Token}'`,
        function (err, result) {
          if (err) {
            console.error("error connecting: " + err.stack);
            return;
          }
          if (result.length > 0) {
            next();
          } else {
            res.status(403).end(); // Bad permission
          }
        }
      );
    } else {
      res.status(403).end(); // Bad permission
    }
  };
};
