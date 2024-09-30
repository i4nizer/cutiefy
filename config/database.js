const mysql = require('mysql2')



const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cutiefy'
});

database.connect((err) => {
    if (err) return console.log(`An error occured when connecting to database: ${err}`)
    console.log('Database connected successfully')
})



module.exports = database