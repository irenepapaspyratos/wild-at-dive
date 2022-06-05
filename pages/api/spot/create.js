import { dbConnect } from '../../../src/lib/db/database';
import Spot from '../../../src/models/Spot';
import Animal from '../../../src/models/Animal';
import Organizer from '../../../src/models/Organizer';

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

		if (data.checkedRefs.animals !== []) {
			const updatedAnimals = await Animal.updateMany(
				{ _id: { $in: data.checkedRefs.animals } },
				{
					$push: { spotsRef: newSpot.id },
				}
			);
			res.status(200).json({
				message: 'All Animals updated',
				entry: updatedAnimals,
			});
		}

		if (data.checkedRefs.organizers !== []) {
			const updatedOrganizers = await Organizer.updateMany(
				{ _id: { $in: data.checkedRefs.organizers } },
				{
					$push: { spotsRef: newSpot.id },
				}
			);
			res.status(200).json({
				message: 'All Organizers updated',
				entry: updatedOrganizers,
			});
		}

		res.status(500).json({
			message: 'Something went wrong',
			entry: req.body,
		});
	} else {
		res.status(400).json({ error: 'wrong method' });
	}
}
