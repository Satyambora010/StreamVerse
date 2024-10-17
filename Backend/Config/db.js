import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

export const dbConnection = async () => {
    try {
        await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

