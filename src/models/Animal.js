/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import Spot from './Spot';

const animalSchema = new mongoose.Schema({
	name: String,
	spotsRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spot' }],
	description: String,
	wiki: String,
});
const Animal = mongoose.models?.Animal ?? mongoose.model('Animal', animalSchema);

export default Animal;
