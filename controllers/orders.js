const db = require('../db/db.js');


let add_order = (order_id, product_id, quantity, total_price, fname, lname, street_address, town, state, phone, exphone, email, notes) => {
    db.run(`INSERT INTO Orders (order_id, product_id, Quantity, Total_Price, Customer_Fname, Customer_Lname, Customer_Street_address, Customer_Town, Customer_State, Customer_phone, Customer_exphone, Customer_Email_address, Customer_Notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
    [order_id, product_id, quantity, total_price, fname, lname, street_address, town, state, phone, exphone, email, notes], 
    function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}


let get_all_orders = () => {
    db.all("SELECT * FROM Orders;", [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
        return rows;
    });
}



let get_order_by_id = (order_id) => {
    db.all("SELECT * FROM Orders WHERE order_id = ?;", [order_id], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
        return rows;
    });
}


let delete_order_by_id = (order_id) => {
    db.run("DELETE FROM Orders WHERE order_id = ?;", [order_id], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log('Order deleted successfully');
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






module.exports = { add_order, get_all_orders, get_order_by_id, delete_order_by_id };


