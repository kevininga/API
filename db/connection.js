import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Setup dotenv
dotenv.config();

const DATABASE_URI = process.env.DATABASE_URI;
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';

// Setup database
const db = mongoose.connection;

// db config
const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if (ENVIRONMENT === 'prod') {
    mongoose.connect(DATABASE_URI, mongooseConfig);
} else {
    // specify the database name in the URI
    mongoose.connect('mongodb://127.0.0.1:27017/api', mongooseConfig);
}

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to the database');
});

export default db;
