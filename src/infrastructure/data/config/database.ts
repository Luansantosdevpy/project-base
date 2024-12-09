import dotenv, { config } from 'dotenv';

dotenv.config();

const dbConfig = {
  uri: process.env.DATABASE_URI!,
  options: {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
  }
};

export default dbConfig;
