const db = require('../db/db.js');

let add_product = (id, img_path, name, quantity, description, category, price) => {
    db.run(`INSERT INTO products (product_id, product_img, product_name, Quantity, Description, Category_name, price) VALUES (?, ?, ?, ?, ?, ?, ?)`, [id, img_path, name, quantity, description, category, price], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

let get_all_products = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products;", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}

let get_product_by_name = (name) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products WHERE product_name = ?;", [name], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}

let delete_product_by_name = (name) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM products WHERE product_name = ?;", [name], function(err) {
            if (err) {
                reject(err);
            } else {
                console.log('Product deleted successfully');
                resolve({ success: true, message: 'Product deleted successfully' });
            }
        });
    });
}

let get_categories = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT DISTINCT Category_name FROM Products", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows.map(row => row.Category_name));
            }
        });
    });
};

let get_products_by_category = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT product_img, product_name, Quantity, Description, Price, Category_name FROM Products ORDER BY Category_name;", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                const result = rows.reduce((acc, row) => {
                    if (!acc[row.Category_name]) {
                        acc[row.Category_name] = [];
                    }
                    acc[row.Category_name].push({
                        product_img: row.product_img,
                        product_name: row.product_name,
                        Quantity: row.Quantity,
                        Description: row.Description,
                        Price: row.Price
                    });
                    return acc;
                }, {});
                console.log(result);
                resolve(result);
            }
        });
    });
}

module.exports = {
    add_product,
    get_all_products,
    get_product_by_name,
    delete_product_by_name,
    get_categories,
    get_products_by_category
};
