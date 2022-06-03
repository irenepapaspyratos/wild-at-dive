import { dbConnect } from '../../../src/lib/db/database';
import Organizer from '../../../src/models/Organizer';
import Animal from '../../../src/models/Animal';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);
		await dbConnect();

		const newOrganizer = await Organizer.create({
			name: data.name,
			url: data.url,
			description: data.description,
			spots: data.spots,
			address: data.address,
			email: data.email,
			phone: data.phone,
		});
		res.status(200).json({
			message: 'New Organizer created',
			entry: newOrganizer,
		});

		if (data.checkedRefs.animals !== []) {
			const updatedAnimals = await Animal.updateMany(
				{ _id: { $in: data.checkedRefs.animals } },
				{
					$push: { organizersRef: newOrganizer.id },
				}
			);
			res.status(200).json({
				message: 'All Animals updated',
				entry: updatedAnimals,
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
