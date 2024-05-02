-- Query 1 INSERT
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- Query 2 UPDATE
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
-- Query 3 DELETE
DELETE FROM account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
