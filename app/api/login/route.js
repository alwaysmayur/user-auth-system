// Import necessary modules
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import { NextResponse } from "next/server";
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

// Define the login API endpoint
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json( {
        status: 400,
         message: 'Email and password are required.' 
      });
    }

    // Fetch user from database based on email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    // Check if user exists
    if (rows.length === 0) {
      return NextResponse.json( {
        status: 401,
        message: 'Invalid email or password.' 
      });
    }

    // Compare hashed password with provided password
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!match) {
      return NextResponse.json( {
        status: 401,
         message: 'Invalid email or password.'
      });
    }

    // Check if user role is admin
    if (user.role !== 'admin') {
      return NextResponse.json( {
        status: 403,
      message: 'You do not have permission to log in only admin can logins.'
      });
    }

    // If all checks pass, return success message or token
    return NextResponse.json( {
      status: 200,
      message: 'Login successful.'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json( {
      status: 500,
       message: 'Internal server error.'
    });
  }
}
