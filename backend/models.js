const db = require('./database');

db.run(`
    CREATE TABLE IF NOT EXISTS Events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        startTime TEXT NOT NULL,
        endTime TEXT NOT NULL,
        accessCode TEXT NOT NULL,
        status TEXT DEFAULT 'CLOSED'
    )
`);
    
db.run(`
    CREATE TABLE IF NOT EXISTS Participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

// Create Attendance table
db.run(`
    CREATE TABLE IF NOT EXISTS Attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eventId INTEGER NOT NULL,
        participantId INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (eventId) REFERENCES Events (id),
        FOREIGN KEY (participantId) REFERENCES Participants (id)
    )
`);
module.exports = {
    // Event-related functions
    createEvent: (event, callback) => {
        const { name, startTime, endTime, accessCode } = event;
        db.run(
            `INSERT INTO Events (name, startTime, endTime, accessCode) VALUES (?, ?, ?, ?)`,
            [name, startTime, endTime, accessCode],
            function (err) {
                callback(err, { id: this.lastID });
            }
        );
    },
    updateEventStatus: (eventId, status, callback) => {
        db.run(
            `UPDATE Events SET status = ? WHERE id = ?`,
            [status, eventId],
            callback
        );
    },
    getEventById: (eventId, callback) => {
        db.get(`SELECT * FROM Events WHERE id = ?`, [eventId], callback);
    },    
    getAllEvents: (callback) => {
        db.all(`SELECT * FROM Events`, [], callback);
    },
    deleteEvent: (eventId, callback) => {
        db.run(`DELETE FROM Events WHERE id = ?`, [eventId], callback);
    },    

    // Participant-related functions
    createParticipant: (participant, callback) => {
        const { name, email } = participant;
        db.run(
            `INSERT INTO Participants (name, email) VALUES (?, ?)`,
            [name, email],
            function (err) {
                callback(err, { id: this.lastID });
            }
        );
    },
    updateParticipant: (participantId, updatedData, callback) => {
        const { name, email } = updatedData;
        db.run(
            `UPDATE Participants SET name = ?, email = ? WHERE id = ?`,
            [name, email, participantId],
            callback
        );
    },
    getParticipantById: (participantId, callback) => {
        db.get(`SELECT * FROM Participants WHERE id = ?`, [participantId], callback);
    },
    getParticipantsByEvent: (eventId, callback) => {
        db.all(
            `SELECT p.id, p.name, p.email
             FROM Participants p
             JOIN Attendance a ON p.id = a.participantId
             WHERE a.eventId = ?`,
            [eventId],
            callback
        );
    },    
    deleteParticipant: (participantId, callback) => {
        db.run(`DELETE FROM Participants WHERE id = ?`, [participantId], callback);
    },    

    // Attendance-related functions
    recordAttendance: (attendance, callback) => {
        const { eventId, participantId, timestamp } = attendance;
        db.run(
            `INSERT INTO Attendance (eventId, participantId, timestamp) VALUES (?, ?, ?)`,
            [eventId, participantId, timestamp],
            callback
        );
    },
    getAttendanceByEvent: (eventId, callback) => {
        db.all(
            `SELECT a.id, p.name AS participantName, a.timestamp
             FROM Attendance a
             JOIN Participants p ON a.participantId = p.id
             WHERE a.eventId = ?`,
            [eventId],
            callback
        );
    }
};
