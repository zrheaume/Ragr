DROP DATABASE IF EXISTS ragrDB;
CREATE DATABASE ragrDB;
USE ragrDB;

CREATE TABLE users (
	user_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    pw VARCHAR(25) NOT NULL,
    name_first VARCHAR(25) NOT NULL,
    name_last VARCHAR(25) NOT NULL,
    birth_date DATE NOT NULL,
    profile_id INTEGER NOT NULL,
    auth_key varchar(35)
);

CREATE TABLE profiles (
	profile_id INTEGER NOT NULL AUTO_INCREMENT KEY,
    style INTEGER NOT NULL,
    bounds INTEGER NOT NULL,
    setting INTEGER NOT NULL,
    alc INTEGER NOT NULL,
    drug INTEGER NOT NULL
);

CREATE TABLE parties (
    party_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    party_name VARCHAR(35) NOT NULL,
    party_date DATE NOT NULL,
    party_address VARCHAR(200) NOT NULL,
    host_id INTEGER NOT NULL,
    profile_id INTEGER NOT NULL
);

SELECT * FROM users;