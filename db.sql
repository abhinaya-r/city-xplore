CREATE TABLE [IF NOT EXISTS] users (
   user_id serial PRIMARY KEY,
   first_name VARCHAR (255) NOT NULL,
   last_name VARCHAR (255) NOT NULL,
   password VARCHAR ( 50 ) NOT NULL,
   email VARCHAR ( 255 ) UNIQUE NOT NULL,
   created_on TIMESTAMP NOT NULL,
   birthday DATE NOT NULL,
   gender VARCHAR ( 50 ) NOT NULL,
   last_login TIMESTAMP 
);

CREATE TABLE itineraries (
   user_id INTEGER PRIMARY KEY,
   itineraries JSON []
);