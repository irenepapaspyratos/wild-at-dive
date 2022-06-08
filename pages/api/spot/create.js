import { dbConnect } from '../../../src/lib/db/database';
import Spot from '../../../src/models/Spot';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);
		await dbConnect();

		const newSpot = await Spot.create({
			name: data.name,
			country: data.country,
			geoTag: data.geoTag,
			description: data.description,
			wiki: data.wiki,
		});
		res.status(200).json({
			message: 'New Spot created',
			entry: newSpot,
		});
	} else {
		res.status(400).json({ error: 'wrong method' });
	}
}
