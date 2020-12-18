CREATE TABLE IF NOT EXISTS  'results' ( "id" INTEGER PRIMARY KEY AUTOINCREMENT, "crimeType" VARCHAR NOT NULL, "searchNum" INTEGER);

INSERT INTO 'results' (crimeType, searchNum) select  "accident", 13 WHERE NOT EXISTS (SELECT * FROM 'results' WHERE id = 1);
INSERT INTO 'results' (crimeType, searchNum) select  "theft", 5 WHERE NOT EXISTS (SELECT * FROM 'results' WHERE id = 2);
INSERT INTO 'results' (crimeType, searchNum) select  "sex offense", 17 WHERE NOT EXISTS (SELECT * FROM 'results' WHERE id = 3);
INSERT INTO 'results' (crimeType, searchNum) select  "robbery", 14 WHERE NOT EXISTS (SELECT * FROM 'results' WHERE id = 4);
INSERT INTO 'results' (crimeType, searchNum) select  "assault", 13 WHERE NOT EXISTS (SELECT * FROM 'results' WHERE id = 5);
