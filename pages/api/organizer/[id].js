import { dbConnect } from '../../../src/lib/db/database';
import Organizer from '../../../src/models/Organizer';

export default async function handler(req, res) {
	const { id } = req.query;

	if (req.method === 'PUT') {
		const data = JSON.parse(req.body);
		await dbConnect();

		let organizerSpots = [];
		let organizerAnimals = [];
		if (data.checkedRefs.spots !== []) {
			data.checkedRefs.spots.forEach(spot => {
				const spotId = spot.split('$$')[0];
				const spotName = spot.split('$$')[1];

				organizerSpots.push({ name: spotName, animalsRef: [], spotsRef: spotId });
			});

			if (data.checkedRefs.animals !== []) {
				data.checkedRefs.animals.forEach(animal => {
					const spotRef = animal.split('$$')[0];
					const animalRef = animal.split('$$')[1];
					organizerAnimals.push(animalRef);

					var index = organizerSpots.findIndex(spot => spot.spotsRef === spotRef);
					if (index !== -1) {
						organizerSpots[index].animalsRef.push = animalRef;
					}
				});
			}
		}

		/*
		const updatedOrganizer = await Organizer.findByIdAndUpdate(
			id,
			{
				name: data.name,
				url: data.url,
				description: data.description,
				spots: organizerSpots,
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

		if (organizerAnimals !== []) {
			const updatedAnimalsAdd = await Animal.updateMany(
				{
					$and: [{ _id: { $in: organizerAnimals } }, { organizersRef: { $nin: id } }],
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
					$and: [{ _id: { $nin: organizerAnimals } }, { organizersRef: { $in: id } }],
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
		*/
	} else if (req.method === 'DELETE') {
		//await dbConnect();

		const deletedOrganizer = await Organizer.findByIdAndDelete(id);
		res.status(200).json({
			message: 'Organizer deleted',
			product: deletedOrganizer,
		});
	} else {
		res.status(400).json({ error: 'wrong method' });
	}
}
