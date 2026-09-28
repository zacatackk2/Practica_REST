CREATE DATABASE practica_rest;
GO

USE practica_rest;
GO

CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    points INT,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100)
);
GO

INSERT INTO Users (name, age, points, username, password) VALUES
('Cesar', 20, 100, 'admin', '1234'),
('Ana', 21, 80, 'ana', 'abcd');
GO
