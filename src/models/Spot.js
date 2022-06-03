import mongoose from 'mongoose';

const spotSchema = new mongoose.Schema({
	name: String,
	country: String,
	geoTag: Object,
	description: String,
	wiki: String,
});
const Spot = mongoose.models?.Spot ?? mongoose.model('Spot', spotSchema);

export default Spot;
