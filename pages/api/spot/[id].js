import { dbConnect } from '../../../src/lib/db/database';
import Spot from '../../../src/models/Spot';
import Animal from '../../../src/models/Animal';
import Organizer from '../../../src/models/Organizer';

export default async function handler(req, res) {
	const { id } = req.query;

	if (req.method === 'PUT') {
		const data = JSON.parse(req.body);
		await dbConnect();

		if (data.newId) {
			if (data.checkedRefs.animals !== []) {
				data.checkedRefs.animals = data.checkedRefs.animals.map(animal =>
					animal.toString()
				);
			}

			let resArray = [];
			if (data.checkedRefs.organizers !== []) {
				const updatedOrganizersAdd = await Organizer.updateMany(
					{ _id: { $in: data.checkedRefs.organizers } },
					{
						$push: {
							spots: {
								name: data.newName,
								animalsRef: data.checkedRefs.animals,
								spotsRef: id,
							},
						},
					}
				);
				resArray.push = updatedOrganizersAdd;
			}
			if (data.checkedRefs.animals !== []) {
				const updatedAnimalsAdd = await Animal.updateMany(
					{ _id: { $in: data.checkedRefs.animals } },
					{
						$push: { spotsRef: id },
					}
				);
				resArray.push = updatedAnimalsAdd;
			}

			res.status(200).json({
				message: 'Organizers to add updated',
				entry: resArray,
			});
		}

		/*
		const updatedSpot = await Spot.findByIdAndUpdate(
			id,
			{
				name: data.name,
				country: data.country,
				geoTag: data.geoTag,
				description: data.description,
				wiki: data.wiki,
			},
			{
				new: true,
			}
		);
		res.status(200).json({
			message: 'Spot updated',
			entry: updatedSpot,
		});

		if (data.checkedRefs.animals !== []) {
			data.checkedRefs.animals = ['629693977d84f959e955a492'];
			const updatedAnimalsAdd = await Animal.updateMany(
				{
					$and: [{ _id: { $in: data.checkedRefs.animals } }, { spotsRef: { $nin: id } }],
				},
				{
					$push: { spotsRef: id },
				}
			);
			res.status(200).json({
				message: 'Animals to add updated',
				entry: updatedAnimalsAdd,
			});

			const updatedAnimalsCut = await Animal.updateMany(
				{
					$and: [{ _id: { $nin: data.checkedRefs.animals } }, { spotsRef: { $in: id } }],
				},
				{
					$pull: { spotsRef: id },
				}
			);
			res.status(200).json({
				message: 'Animals to cut updated',
				entry: updatedAnimalsCut,
			});
		}

		if (data.checkedRefs.organizers !== []) {
			const updatedOrganizersAdd = await Organizer.updateMany(
				{
					$and: [
						{ _id: { $in: data.checkedRefs.organizers } },
						{ spotsRef: { $nin: id } },
					],
				},
				{
					$push: { spotsRef: id },
				}
			);
			res.status(200).json({
				message: 'Organizers to add updated',
				entry: updatedOrganizersAdd,
			});

			const updatedOrganizersCut = await Organizer.updateMany(
				{
					$and: [
						{ _id: { $nin: data.checkedRefs.organizers } },
						{ spotsRef: { $in: id } },
					],
				},
				{
					$pull: { spotsRef: id },
				}
			);
			res.status(200).json({
				message: 'Organizers to cut updated',
				entry: updatedOrganizersCut,
			});
		}

		res.status(500).json({
			message: 'Something went wrong',
			entry: req.body,
		});
		*/
	} else if (req.method === 'DELETE') {
		await dbConnect();

		const updatedAnimalsCut = await Animal.updateMany(
			{ spotsRef: { $in: id } },
			{ $pull: { spotsRef: id } }
		);
		Organizer.find;
		const updatedOrganizersCut = await Organizer.updateMany(
			{},
			{ $pull: { spots: { 'spots.$[element].spotsRef': id } } }
		);

		const deletedSpot = await Spot.findByIdAndDelete(id);
		res.status(200).json({
			message: 'Spot deleted',
			deletedEntry: [deletedSpot, updatedOrganizersCut, updatedAnimalsCut],
		});
	} else {
		const singleSpot = await Spot.findById(id);
		res.status(200).json(singleSpot);
	}
}
