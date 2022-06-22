BEGIN;

-- user is a keyword so cant be used like this use `user` instead
CREATE TABLE "user" ( 
  id SERIAL PRIMARY KEY
  );

-- initialise your tables here
-- insert some test data if you like

COMMIT;
