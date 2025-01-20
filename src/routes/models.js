const { sequelize } = require('./database.js');
const { DataTypes } = require('sequelize');

const EventOrganizer = sequelize.define('EventOrganizer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING, allowNull: false },
    password: {type: DataTypes.STRING, allowNull: false}
})

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
    accessCode: { type: DataTypes.STRING, allowNull: false }
});

const Attendance = sequelize.define('Attendance', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    timestamp: { type: DataTypes.STRING, allowNull: false },
});

Event.hasMany(Attendance, { foreignKey: 'eventId' });
Participant.hasMany(Attendance, { foreignKey: 'participantId' });
EventOrganizer.hasMany(Event, { foreignKey: 'eoId' }); 
Event.belongsTo(EventOrganizer, { foreignKey: 'eoId' });
Attendance.belongsTo(Event, { foreignKey: 'eventId' });
Attendance.belongsTo(Participant, { foreignKey: 'participantId' });

sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database:', err));

const createEvent = async (eventData, callback) => {
    try {
        const event = await Event.create(eventData);
        callback(null, event);
    } catch (error) {
        console.error("Error creating event:", error);
        callback(error, null);
    }
};

const getAllEvents = async (callback) => {
    try {
        const events = await Event.findAll();
        callback(null, events);
    } catch (error) {
        console.error("Error fetching events:", error);
        callback(error, null);
    }
};

const getUserEvents = async (eoId, callback) => {
    try {
        // console.log(eoId);
        const events = await Event.findAll({
            where: { eoId },
        });
        // console.log(events);
        callback(null, events);
    } catch (error) {
        console.error("Error fetching user events:", error);
        callback(error, null);
    }
};

const deleteEvent = async (eventId, callback) => {
    try {
        const result = await Event.destroy({
            where: { id: eventId },
        });

        if (result === 0) {
            callback(`Event with id ${eventId} not found`, null);
        } else {
            callback(null, `Event with id ${eventId} successfully deleted`);
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        callback(error, null);
    }
};

const recordAttendance = async (attendanceData, callback) => {
    try {
        const attendance = await Attendance.create(attendanceData);
        callback(null, attendance);
    } catch (error) {
        console.error("Error recording attendance:", error);
        callback(error, null);
    }
};

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

const signIn = async (eoData, callback) => {
    try{
        const eo = await EventOrganizer.create(eoData);
        callback(null,eo);
    } catch (error) {
        console.error('Error logging in:', error);
        callback(error, null);
    }
};

const logIn = async (logDetails, callback) => {
    try {
        const {name, password} = logDetails;
        const user = await EventOrganizer.findOne({
            where: { name }});
        
        if (!user) {
            callback('User not found', null);
            return;
        }
    
        const isPasswordMatch = user.password === password;
        if (!isPasswordMatch) {
            callback('Invalid password', null);
            return;
        }

        logDetails={ id: user.id, name: user.name}

        callback(null, logDetails);
    } catch (error) {
        console.error("Error logging in:", error);
        callback(error, null);
    }
};

module.exports = {
    Event,
    Participant,
    Attendance,
    EventOrganizer,
    createEvent,
    getAllEvents,
    getUserEvents,
    recordAttendance,
    getAttendanceByEvent,
    deleteEvent,
    signIn,
    logIn,
};
