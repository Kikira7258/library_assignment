const mysql = require('mysql2');

// connect to database
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "library_classwork"
})

// tells if the database is connected or not
conn.connect((err) => {
    if(err) console.log(err);
    else console.log('Database connected!')
})

module.exports = conn