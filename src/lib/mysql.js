import mysql from 'mysql2/promise';

const DATABASE_URL = 'mysql://root:mysqlpass1234!@localhost:3306/hospital';


const connection = await mysql.createConnection(DATABASE_URL)

export default connection
