import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

// Create a connection pool
const pool = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12713339',
  password: 'mBJibc9avs',
  database: 'sql12713339',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to create the 'users' table
const createUsersTable = async () => {
  try {
    const connection = await pool.getConnection();
    // Construct the SQL query to create the table
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fname VARCHAR(255) NOT NULL,
        lname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
      )
    `;
    // Execute the query to create the table
    const result = await connection.query(query);
    // Release the connection
    connection.release();
    return result;
  } catch (error) {
    throw error;
  }
};

// Function to insert user data into the 'users' table
const createUser = async (userData) => {
  try {
    const connection = await pool.getConnection();
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the salt rounds
    // Construct the SQL query
    const query = 'INSERT INTO users (fname, lname, email, password, role) VALUES (?, ?, ?, ?, ?)';
    // Execute the query with user data
    const result = await connection.query(query, [userData.fname, userData.lname, userData.email, hashedPassword, userData.role]);
    // Release the connection
    connection.release();
    return result;
  } catch (error) {
    throw error.sqlMessage;
  }
};

export { createUsersTable, createUser };
