CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(20) DEFAULT 'STAFF'
);
SELECT * FROM users;
DROP TABLE users CASCADE;

DROP TABLE IF EXISTS users CASCADE;
INSERT INTO users (name, email, password, role)
VALUES
('Nimal Perera', 'nimal@gmail.com', 'hashed_password_1', 'Admin'),
('Kamal Silva', 'kamal@gmail.com', 'hashed_password_2', 'User'),
('Amali Fernando', 'amali@gmail.com', 'hashed_password_3', 'Manager'),
('Saman Kumara', 'saman@gmail.com', 'hashed_password_4', 'User'),
('Nadeesha Peris', 'nadeesha@gmail.com', 'hashed_password_5', 'User'),
('Kasun Jayawardena', 'kasun@gmail.com', 'hashed_password_6', 'Admin'),
('Tharushi Silva', 'tharushi@gmail.com', 'hashed_password_7', 'Manager'),
('Dilshan Fernando', 'dilshan@gmail.com', 'hashed_password_8', 'User');
