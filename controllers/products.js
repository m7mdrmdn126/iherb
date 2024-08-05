db = require('../db/db.js')



// function to add products ya 3am mazen 

let add_product = (id , img_path , name , quantity , description , category , price ) => {

    db.run(`INSERT INTO products (product_id, product_img , product_name , Quantity ,  Description , Category_name , price) VALUES (?, ? ,? ,?, ? ,?, ?)`, [id , img_path , name , quantity , description , category , price], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}


// a function to get all products ya 3am mazen  bt return all the rows as an array wenta et3amel

let get_all_products = () => {
    db.all("select * from products ;", [], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
        return rows
    });
    
}




let get_product_by_name = (name) => {
    db.all("select * from products where product_name = ?;", [name], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
        return rows
    });
}



let delete_product_by_name = (name) => {
    db.all("delete from products where product_name = ?;", [name], (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Product deleted successfully'); 
    });
}



module.exports = {add_product , get_all_products , get_product_by_name}


//add_product(125 , "/img/125.png" , "herbela" , 12 , "haircutting " , "cosmatics" , 12)
//get_products()
//get_product_by_name("hfh")
//delete_product_by_name("hfh")