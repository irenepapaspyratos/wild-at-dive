import { dbConnect } from '../../../src/lib/db/database';
import Organizer from '../../../src/models/Organizer';
import Animal from '../../../src/models/Animal';

export default async function handler(req, res) {
	const { id } = req.query;

	if (req.method === 'PUT') {
		const data = JSON.parse(req.body);
		await dbConnect();

		const updatedOrganizer = await Organizer.findByIdAndUpdate(
			id,
			{
				name: data.name,
				url: data.url,
				description: data.description,
				spots: data.spots,
				address: data.address,
				email: data.email,
				phone: data.phone,
			},
			{
				new: true,
			}
		);
		res.status(200).json({
			message: 'Organizer updated',
			entry: updatedOrganizer,
		});

		if (data.checkedRefs.animals !== []) {
			const updatedAnimalsAdd = await Animal.updateMany(
				{
					$and: [
						{ _id: { $in: data.checkedRefs.animals } },
						{ organizersRef: { $nin: id } },
					],
				},
				{
					$push: { organizersRef: id },
				}
			);
			res.status(200).json({
				message: 'Animals to add updated',
				entry: updatedAnimalsAdd,
			});

			const updatedAnimalsCut = await Animal.updateMany(
				{
					$and: [
						{ _id: { $nin: data.checkedRefs.animals } },
						{ organizersRef: { $in: id } },
					],
				},
				{
					$pull: { organizersRef: id },
				}
			);
			res.status(200).json({
				message: 'Animals to cut updated',
				entry: updatedAnimalsCut,
			});
		}

		res.status(500).json({
			message: 'Something went wrong',
			entry: req.body,
		});
	} else if (req.method === 'DELETE') {
		await dbConnect();

		const deletedOrganizer = await Organizer.findByIdAndDelete(id);
		res.status(200).json({
			message: 'Organizer deleted',
			product: deletedOrganizer,
		});
	} else {
		res.status(400).json({ error: 'wrong method' });
	}
}