sqlite3 = require('sqlite3')

let db = new sqlite3.Database('D:/rmdn/iherb/site/db/iherb.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});





module.exports = db


