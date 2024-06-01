CREATE TABLE transition (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  area_office VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  subprovince VARCHAR(255) NOT NULL,
  major VARCHAR(255) NOT NULL,
  education_area VARCHAR(255),
);

CREATE TABLE contact (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  email VARCHAR(255) NOT NULL,
  line VARCHAR(255),
  facebook VARCHAR(255),
  phone VARCHAR(20),
);

CREATE TABLE swapper_user_base (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  picture TEXT,
  setup_complete BOOLEAN NOT NULL DEFAULT false,
  last_login TIMESTAMP WITH TIME ZONE,
);

CREATE TABLE swapper_user (
  user_id INTEGER PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  nickname VARCHAR(255),
  school_name VARCHAR(255),
  origin_id INTEGER REFERENCES transition(id),
  destination_id INTEGER REFERENCES transition(id),
  contact_id INTEGER REFERENCES contact(id),
  FOREIGN KEY (user_id) REFERENCES swapper_user_base(id),
);

-- Create a function to update the 'updated_at' column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on the 'swapper_user_base', 'transition' and 'contact' tables
CREATE TRIGGER update_swapper_user_modtime
BEFORE UPDATE ON swapper_user_base
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_transition_modtime
BEFORE UPDATE ON transition
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_contact_modtime
BEFORE UPDATE ON contact
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- Match notifications:
CREATE TYPE match_request_status AS ENUM (
    'PENDING',
    'ACCEPTED',
    'ACCEPTED_ACK',
    'REJECTED',
    'IGNORED',
    'EXPIRED',
    'CANCELLED',
    'SWAPPED',
);

-- Create the match_request table
CREATE TABLE match_request (
  id SERIAL PRIMARY KEY,
  my_user_id INTEGER REFERENCES swapper_user_base(id),
  other_user_id INTEGER REFERENCES swapper_user_base(id),
  status match_request_status NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger on the 'match_request' table
CREATE TRIGGER update_match_request_modtime
BEFORE UPDATE ON match_request
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();
