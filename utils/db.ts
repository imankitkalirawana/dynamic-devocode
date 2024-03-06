// utils/db.js
import mongoose from 'mongoose';
import logger from '@/utils/logger';

const databaseUrl = process.env.NEXT_PUBLIC_MONGO_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(databaseUrl);
        // logger.log("info", "Connected to MongoDB");
        console.log('Connected to MongoDB');
    } catch (error) {
        logger.log("error", `Error connecting to MongoDB: ${error}`);
        console.error('Error connecting to MongoDB:', error);
    }

};

export { connectDB };
