-- Create the account table
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(50) NOT NULL,
    account_lastname VARCHAR(50) NOT NULL,
    account_email VARCHAR(100) UNIQUE NOT NULL,
    account_password VARCHAR(100) NOT NULL,
    account_type VARCHAR(50)
);

-- Insert initial data into the account table
INSERT INTO account (
    account_firstname,
    account_lastname,
    account_email,
    account_password,
    account_type
)
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n',
    'Admin'
);

-- Update account type to 'Admin' for Tony Stark
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';

-- Delete Tony Stark's account
DELETE FROM account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';

-- Create the classification table
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) UNIQUE NOT NULL
);

-- Insert initial data into the classification table (if needed)
INSERT INTO classification (classification_name)
VALUES ('Sport');

-- Create the inventory table with foreign key reference to classification
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_description TEXT,
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255),
    classification_id INT,
    FOREIGN KEY (classification_id) REFERENCES classification(classification_id)
);

-- Insert initial data into the inventory table (if needed)
INSERT INTO inventory (
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    classification_id
)
VALUES (
    'GM',
    'Hummer',
    'Small SUV',
    '/images/hummer.png',
    '/thumbnails/hummer_thumb.png',
    1  -- assuming classification_id for 'Sport' is 1
);

-- Update inventory description for GM Hummer
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'Small', 'Huge')
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';

-- Join inventory and classification tables
SELECT inv_make,
    inv_model,
    classification_name
FROM inventory i
JOIN classification cl ON cl.classification_id = i.classification_id
WHERE cl.classification_name = 'Sport';

-- Update inventory image paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', 'images/vehicles'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/thumbnails', 'images/vehicles/thumbnails');

-- The SQL file containing all queries to build the tables, insert data, and perform updates and deletions is present and works
