-- database.sql
CREATE DATABASE car_sales_db;
GO

USE car_sales_db;
GO

CREATE TABLE customers (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255)
);

CREATE TABLE purchase_requests (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    request_date DATETIME NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE quotes (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    request_id BIGINT NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    note VARCHAR(MAX),
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (request_id) REFERENCES purchase_requests(id)
);

CREATE TABLE contracts (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    quote_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (quote_id) REFERENCES quotes(id)
);