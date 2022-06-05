/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import Spot from './Spot';
import Animal from './Animal';

const organizerSchema = new mongoose.Schema({
	name: String,
	url: String,
	description: String,
	address: String,
	phone: String,
	email: String,
	spots: [
		{
			name: String,
			animalsRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
			spotsRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spot' }],
		},
	],
	wiki: String,
});
const Organizer = mongoose.models?.Organizer ?? mongoose.model('Organizer', organizerSchema);

export default Organizer;
