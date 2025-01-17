const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { Sequelize } = require('sequelize');



const dbPath = path.join(__dirname, '../attendance.db');


const rawDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Sequelize connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false, // Disable logging; enable for debugging if needed
});

module.exports = { sequelize, rawDb };
