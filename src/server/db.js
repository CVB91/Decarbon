const mysql = require('mysql')

// MySQL connection details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'Password123#@!',
  database: 'decarbonise',
})

connection.connect((error) => {
  if (error) throw error
  console.log('Successfully connected to the database.')
})

module.exports = connection;