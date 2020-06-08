CREATE DATABASE shoppingcart;

CREATE TABLE users (
    _id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    fav INTEGER ARRAY,
    cart INTEGER ARRAY
);

CREATE TABLE products (
    _id SERIAL PRIMARY KEY,
    productTitle VARCHAR(255),
    productDesc TEXT
);