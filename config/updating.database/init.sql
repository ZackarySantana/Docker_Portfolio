CREATE DATABASE IF NOT EXISTS db;
use db;

CREATE TABLE IF NOT EXISTS User (
    UserID int(10) NOT NULL AUTO_INCREMENT,
    University varchar(255) NOT NULL,
    Email varchar(255) UNIQUE NOT NULL,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    PRIMARY KEY (UserID)
);

CREATE TABLE IF NOT EXISTS Permission (
    PermissionName varchar(255) NOT NULL,
    UserID int(10) NOT NULL,
    FOREIGN KEY(UserID)
        REFERENCES User(UserID)
        ON DELETE CASCADE
);

/*  Privileged User Zackary   */
INSERT INTO User (University, Email, FirstName, LastName, Password)
VALUES ("FIU", "zack@fiu.edu", "Zackary", "Santana", MD5("zackarypassword")); /* UserID = 1 */
INSERT INTO Permission (PermissionName, UserID) VALUES ("view_any", 1); /* Allows access to endpoint /users/id/:UserID where UserID != 1 */
INSERT INTO Permission (PermissionName, UserID) VALUES ("view_all", 1); /* Allows access to endpoint /users/all */

/*  Unprivileged User Raul   */
INSERT INTO User (University, Email, FirstName, LastName, Password)
VALUES ("FIU", "raul@fiu.edu", "Raul", "F", MD5("raulpassword")); /* UserID = 2 */

/* -------------------------------------------------- */
/*             Below handles authentication           */
/* -------------------------------------------------- */

CREATE TABLE IF NOT EXISTS Auth (
    UserID int(10) UNIQUE NOT NULL,
    Token varchar(255) NOT NULL
);
