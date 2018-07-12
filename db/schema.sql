--  Here I am creating my database and its table with colummns

DROP DATABASE IF EXISTS  burgers_db;
create database burgers_db;

use burgers_db;

create table burgers(

	id INT NOT NULL AUTO_INCREMENT,
	burger_name VARCHAR(80) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
	);