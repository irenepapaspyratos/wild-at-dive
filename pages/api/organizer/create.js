import { dbConnect } from '../../../src/lib/db/database';
import Organizer from '../../../src/models/Organizer';

export default async function handler(req, res) {
	if (req.method === 'POST') {
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

		const newOrganizer = await Organizer.create({
			name: data.name,
			url: data.url,
			description: data.description,
			spots: organizerSpots,
			address: data.address,
			email: data.email,
			phone: data.phone,
		});

		res.status(200).json({
			message: 'New Organizer created',
			entry: newOrganizer,
		});
	} else {
		res.status(400).json({ error: 'wrong method' });
	}
}
