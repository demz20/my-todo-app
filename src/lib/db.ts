import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 4000,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true, // This is required for TiDB Cloud
    },
    waitForConnections: true,
    connectionLimit: 1, // Recommended for Serverless/Vercel
    queueLimit: 0
});