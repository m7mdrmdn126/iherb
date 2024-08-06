const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('C:\Users\mazen\OneDrive\Desktop\IHerb\IHerb\iherb\db\iherb.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

module.exports = db;
