import { dbConnect } from '../../../src/lib/db/database';
import Animal from '../../../src/models/Animal';
import Organizer from '../../../src/models/Organizer';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);
		await dbConnect();

		const newAnimal = await Animal.create({
			name: data.name,
			spotsRef: data.spotsRef,
			description: data.description,
			wiki: data.wiki,
		});
		res.status(200).json({
			message: 'New Animal created',
			entry: newAnimal,
		});

		if (data.checkedRefs.organizers !== []) {
			const updatedOrganizers = await Organizer.updateMany(
				{ _id: { $in: data.checkedRefs.organizers } },
				{
					$push: { animalsRef: newAnimal.id },
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
