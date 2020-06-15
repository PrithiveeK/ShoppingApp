CREATE DATABASE shoppingcart;

CREATE TABLE users (
    _id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE userfav (
    _id SERIAL PRIMARY KEY,
    user_id INTEGER,
    prod_id INTEGER
);

CREATE TABLE userfav (
    _id SERIAL PRIMARY KEY,
    user_id INTEGER,
    prod_id INTEGER
);

CREATE TABLE products (
    _id SERIAL PRIMARY KEY,
    productTitle VARCHAR(255),
    productDesc TEXT
);

CREATE TABLE productimg (
    _id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    prod_id INTEGER
);