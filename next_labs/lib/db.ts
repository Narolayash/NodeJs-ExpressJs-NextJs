import mySql from 'mysql2/promise'

const connection = await mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab_26'
})

export default connection;
