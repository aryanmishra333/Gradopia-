import mysql from 'mysql2'; // Import mysql2
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Establish the database connection
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

export default connection; // Use ES6 default export
