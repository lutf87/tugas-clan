let mysql = require('mysql')

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_karyawan'
})

conn.connect(function(err){
    if(!!err){
        console.log(err)
    } else {
        console.log('Conn Success!')
    }
})

module.exports = conn;
