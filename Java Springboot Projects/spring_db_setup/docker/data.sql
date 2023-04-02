CREATE DATABASE IF NOT EXISTS USER_APP;

USE USER_APP;

CREATE TABLE users(
 userID int NOT NULL AUTO_INCREMENT,
 name VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL,
 PRIMARY KEY(UserID)
);

INSERT INTO users(name, email) VALUES ("DAVID", "david@gmail.com");
INSERT INTO users(name, email) VALUES ("Vasu", "vasu@gmail.com");
INSERT INTO users(name, email) VALUES ("Panda", "bonda@google.com");