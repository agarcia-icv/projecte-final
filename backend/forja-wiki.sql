CREATE DATABASE forja_wiki;

use forja_wiki;

drop DATABASE forja_wiki;

INSERT INTO tipus_eines (nom)
VALUES ("Tecniques");
DELETE from tipus_eines WHERE id = 1;

SELECT * FROM tipus_eines;
SELECT * FROM users;

SELECT * FROM posts;

UPDATE users SET rol = 'user' WHERE email = 'user@test.com';
UPDATE users SET rol = 'editor' WHERE email = 'editor@test.com';
UPDATE users SET rol = 'admin' WHERE email = 'adria@gmail.com';