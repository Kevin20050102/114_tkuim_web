import { MongoClient } from 'mongodb';
import 'dotenv/config';

const client = new MongoClient(process.env.MONGODB_URI);
let db;

export async function connectDB() {
    if (db) return db;
    await client.connect();
    db = client.db('week12');
    await db.collection('users').createIndex({ username: 1 }, { unique: true });
    console.log('[DB] Connected and Indexes created');
    return db;
}

export const getDB = () => db;