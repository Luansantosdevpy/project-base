import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Logger from '../../log/logger';

dotenv.config();

const dbConfig = {
  uri: process.env.DATABASE_URI!,
  options: {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  },
};

export const initializeDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(dbConfig.uri, dbConfig.options);
    Logger.debug('Connected to MongoDB');
  } catch (error) {
    Logger.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default dbConfig;
