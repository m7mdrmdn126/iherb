const db = require('../db/db.js');


let add_order = (order_id, product_id, quantity, total_price, fname, lname, street_address, town, state, phone, exphone, email, notes) => {
    db.run(`INSERT INTO Orders (order_id, product_id, Quantity, Total_Price, Customer_Fname, Customer_Lname, Customer_Street_address, Customer_Town, Customer_State, Customer_phone, Customer_exphone, Customer_Email_address, Customer_Notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [order_id, product_id, quantity, total_price, fname, lname, street_address, town, state, phone, exphone, email, notes], 
    function(err) {
        if (err) {
            console.error(err.message);
            return { success: false, message: err.message };
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        return { success: true, message: `A row has been inserted with rowid ${this.lastID}` };
    });
}


let get_all_orders = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Orders;", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}



let get_order_by_id = (order_id) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Orders WHERE order_id = ?;", [order_id], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });
}


let delete_order_by_id = (order_id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM Orders WHERE order_id = ?;", [order_id], function(err) {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log('Order deleted successfully');
                resolve({ success: true, message: 'Order deleted successfully' });
            }
        });
    });
}



let get_catogries = () => {
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
        db.all("SELECT product_img, product_name, Quantity, Description, Price FROM Products ORDER BY Category_name;", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                // Group the products by category
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
    add_order,
    get_all_orders,
    get_order_by_id,
    delete_order_by_id
};


