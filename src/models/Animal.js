import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
	name: String,
	spotsRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Spot' }],
	description: String,
	wiki: String,
});
const Animal = mongoose.models?.Animal ?? mongoose.model('Animal', animalSchema);

export default Animal;
