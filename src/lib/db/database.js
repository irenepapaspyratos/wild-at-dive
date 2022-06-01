import mongoose from 'mongoose';

const url = process.env.DB_CONNECTION;

export async function dbConnect() {
	try {
		await mongoose.connect(url);
		console.log('Connected to AtlasDB');
	} catch (error) {
		console.error('ERROR, could not connect', error.message);
	}
}
