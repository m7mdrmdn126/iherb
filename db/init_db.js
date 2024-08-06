const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('C:\Users\mazen\OneDrive\Desktop\IHerb\IHerb\iherb\db\iherb.db', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Connected to the SQLite database.');
});

const createOrdersTable = `CREATE TABLE IF NOT EXISTS Orders (
    order_id INTEGER PRIMARY KEY,
    product_id INTEGER,
    Quantity INTEGER,
    Total_Price REAL,
    Customer_Fname TEXT,
    Customer_Lname TEXT,
    Customer_Street_address TEXT,
    Customer_Town TEXT,
    Customer_State TEXT,
    Customer_phone TEXT,
    Customer_exphone TEXT,
    Customer_Email_address TEXT,
    Customer_Notes TEXT,
    FOREIGN KEY (product_id) REFERENCES Products (product_id)
);`;

const createProductsTable = `CREATE TABLE IF NOT EXISTS Products (
    product_id INTEGER PRIMARY KEY,
    product_img TEXT,
    product_name TEXT,
    Quantity INTEGER,
    Description TEXT,
    Category_name TEXT,
    Price REAL
);`;

db.serialize(() => {
    db.run(createOrdersTable, (err) => {
        if (err) {
            console.error("Could not create Orders table", err);
        } else {
            console.log("Orders table created or already exists.");
        }
    });

    db.run(createProductsTable, (err) => {
        if (err) {
            console.error("Could not create Products table", err);
        } else {
            console.log("Products table created or already exists.");
        }
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
