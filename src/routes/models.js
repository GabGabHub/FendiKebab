const { sequelize, rawDb } = require('./database.js');
const { DataTypes } = require('sequelize');


// Define Models
const Event = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.STRING, allowNull: false },
    endTime: { type: DataTypes.STRING, allowNull: false },
    accessCode: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'CLOSED' },
});

const Participant = sequelize.define('Participant', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Attendance = sequelize.define('Attendance', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: { type: DataTypes.STRING, allowNull: false },
});

Event.hasMany(Attendance, { foreignKey: 'eventId' });
Participant.hasMany(Attendance, { foreignKey: 'participantId' });
Attendance.belongsTo(Event, { foreignKey: 'eventId' });
Attendance.belongsTo(Participant, { foreignKey: 'participantId' });

// Sync database
sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database:', err));

// Create Event
const createEvent = async (eventData, callback) => {
    try {
        const event = await Event.create(eventData);
        callback(null, event);
    } catch (error) {
        console.error("Error creating event:", error);
        callback(error, null);
    }
};

// Get all Events
const getAllEvents = async (callback) => {
    try {
        const events = await Event.findAll();
        callback(null, events);
    } catch (error) {
        console.error("Error fetching events:", error);
        callback(error, null);
    }
};

// Record Attendance
const recordAttendance = async (attendanceData, callback) => {
    try {
        const attendance = await Attendance.create(attendanceData);
        callback(null, attendance);
    } catch (error) {
        console.error("Error recording attendance:", error);
        callback(error, null);
    }
};

// Get Attendance by Event
const getAttendanceByEvent = async (eventId, callback) => {
    try {
        const attendances = await Attendance.findAll({
            where: { eventId },
            include: [{ model: Participant, attributes: ['name', 'email'] }]
        });
        callback(null, attendances);
    } catch (error) {
        console.error("Error fetching attendance:", error);
        callback(error, null);
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    recordAttendance,
    getAttendanceByEvent
};
