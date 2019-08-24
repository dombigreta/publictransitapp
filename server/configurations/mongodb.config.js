
const env = process.env.NODE_ENV || 'dev';

// --- for development
const dev = {
    host:process.env.MONGO_DB_HOST,
    port:process.env.MONGO_DB_PORT,
    name:process.env.DATABASE_NAME
};

// --- for testing
const test = {
    host:null,
    port: null,
    name: null
};

// --- for production
const prod = {
    host:null,
    port:null,
    name:null
};


const config  = {
    dev,
    test,
    prod
};

module.exports = config[env];