const LOGIN_PARMS = {
    jwtSecret: 'n@vtech',
    SESSION_EXP_TIME: 1,
    SESSION_EXP_TYPE: 'hours',
    SALT_SIZE: 16,
    DEFLT_SALT: 'efe78622c971cb92',
};
const BOOLEAN = {
    NO: 'N',
    YES: 'Y'
};
const MONGO_CFG = {
    mongoURI: "mongodb://localhost:27017/orders_db",
}
const TABLE = {
    USERS: 'users',
    ORDERS: 'orders'
};
const DB_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
module.exports = {
    LOGIN_PARMS: LOGIN_PARMS,
    BOOLEAN: BOOLEAN,
    TABLE: TABLE,
    MONGO_CFG: MONGO_CFG,
    DB_OPTIONS: DB_OPTIONS
};
