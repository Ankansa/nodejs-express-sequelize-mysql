const mysql = require('mysql');
const { dbHost, dbUser, dbPassword, databaseName } = require('../load_env');
const bcrypt = require('bcryptjs');

class DATABASE {
    constructor() {

        this.db = mysql.createConnection({
            host: dbHost,
            user: dbUser,
            password: dbPassword,
            database: databaseName
        });

        this.db.connect((err) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return;
            }
            console.log('Connected to database');
        });

        // this.createTable(); // Call createTable method here
    }

    // createTable() {
    //     // Define your table creation SQL statement and execute it here
    //     // For example:
    //     const sql = `
    //         CREATE TABLE IF NOT EXISTS user (
    //             id INT AUTO_INCREMENT PRIMARY KEY,
    //             name VARCHAR(255),
    //             username VARCHAR(255),
    //             password VARCHAR(255),
    //             isActive BOOLEAN
    //         )
    //     `;
    //     this.db.query(sql, (err) => {
    //         if (err) {
    //             console.error('Error creating table:', err);
    //             return;
    //         }
    //         console.log('Table created successfully');
    //     });
    // }


    insertIntoTable(data) {
        // Insert data into the 'user' table
        const { name, username, password, isActive } = data;
        const sql = `INSERT INTO user (name, username, password, isActive) VALUES (?, ?, ?, ?)`;
        this.db.query(sql, [name, username, password, isActive], (err, result) => {
            if (err) {
                console.error('Error inserting into table:', err);
                return;
            }
            console.log('Inserted into table:', result);
        });
    }



    async findUserByUsername(username) {
        return new Promise((resolve, reject) => {
            // Query to find user by username
            const sql = `SELECT * FROM user WHERE username = ?`;
            this.db.query(sql, [username], (err, results) => {
                if (err) {
                    console.error('Error finding user by username:', err);
                    return reject(err);
                }

                // If no user found with the given username
                if (results.length === 0) {
                    return resolve(null); // User not found
                }

                // Return the user if found
                resolve(results[0]);
            });
        });
    }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            // Query to select usernames, names, and ids of all users
            const sql = `SELECT id, name, username FROM user`;
            this.db.query(sql, (err, results) => {
                if (err) {
                    console.error('Error getting all users:', err);
                    return reject(err);
                }

                // Return the results
                resolve(results);
            });
        });
    }

}

module.exports = DATABASE;
