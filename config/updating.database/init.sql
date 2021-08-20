CREATE DATABASE IF NOT EXISTS db;
use db;

/*
Creates three tables: User, Course, UserCourse
- User contains students + professors, denoted by the BOOL "IsProfessor"
- Course contains course information
- UserCourse contains what courses are linked to what students/professors
*/
CREATE TABLE IF NOT EXISTS User (
    UserID int(10) NOT NULL AUTO_INCREMENT,
    University varchar(255) NOT NULL,
    Email varchar(255) UNIQUE NOT NULL,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    IsProfessor BOOL DEFAULT FALSE,
    PRIMARY KEY (UserID)
);

CREATE TABLE IF NOT EXISTS Course (
    CourseID int(10) NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Code varchar(255) NOT NULL,
    ProfessorID int(10) NOT NULL,
    PRIMARY KEY (CourseID),
    FOREIGN KEY (ProfessorID) REFERENCES User (UserID)
);

CREATE TABLE IF NOT EXISTS Session (
    CourseID int(10) NOT NULL,
    Title varchar(255) NOT NULL,
    Description varchar(255) NOT NULL,
    Date Date NOT NULL,
    Duration int(10) NOT NULL,
    Link varchar(255) NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Course (CourseID)
);

CREATE TABLE IF NOT EXISTS UserCourse (
    CourseID int(10) NOT NULL,
    Email varchar(255) NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Course (CourseID)
);

/*
Inserts dummy professor user
*/
INSERT INTO User (University, Email, FirstName, LastName, Password, IsProfessor)
VALUES ("FIU", "debra.davis@fiu.edu", "Debra", "Davis", MD5("debrapassword"), TRUE); /* UserID = 1 */

/*
Inserts dummy courses in to database
*/
INSERT INTO Course (Name, Code, ProfessorID)
VALUES ("Software Engineering", "CEN4010-U01", 1); /* CourseID = 1 */
INSERT INTO Course (Name, Code, ProfessorID)
VALUES ("Software Engineering", "CEN4010-U25", 1); /* CourseID = 2 */

/*
Inserts dummy student in to database
*/
INSERT INTO User (University, Email, FirstName, LastName, Password)
VALUES ("FIU", "zsant014@fiu.edu", "Zackary", "Santana", MD5("zackarypassword")); /* UserID = 2 */
INSERT INTO UserCourse (Email, CourseID) 
VALUES ("zsant014@fiu.edu", 1);

/* -------------------------------------------------- */
/*             Below handles authentication           */
/* -------------------------------------------------- */

CREATE TABLE IF NOT EXISTS Auth (
    UserID int(10) UNIQUE NOT NULL,
    Token varchar(255) NOT NULL
);
