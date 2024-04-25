
CREATE TABLE transition (
  id SERIAL PRIMARY KEY,
  area_office VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  subprovince VARCHAR(255) NOT NULL,
  major VARCHAR(255) NOT NULL
);

CREATE TABLE contact (
  id SERIAL PRIMARY KEY,
  phone VARCHAR(20),
  facebook VARCHAR(255),
  line VARCHAR(255),
  email VARCHAR(255) NOT NULL
);

CREATE TABLE swapper_user_base (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  picture TEXT,
  setup_complete BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE swapper_user (
  user_id INTEGER PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  nickname VARCHAR(255),
  origin_id INTEGER REFERENCES transition(id),
  destination_id INTEGER REFERENCES transition(id),
  contact_id INTEGER REFERENCES contact(id),
  FOREIGN KEY (user_id) REFERENCES swapper_user_base(id)
);
