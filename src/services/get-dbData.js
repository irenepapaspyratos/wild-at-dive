import Spot from '../models/Spot';
import Animal from '../models/Animal';
import Organizer from '../models/Organizer';

import { dbConnect } from '../lib/db/database';

export default async function getDbData(identifier) {
	await dbConnect();

	switch (identifier) {
		case 'spot':
		case 'spots': {
			const spots = await Spot.find();
			console.log('getSpots: ', spots);

			return spots.map(({ id, name, country, geoTag, description, wiki }) => {
				return {
					id,
					name,
					country,
					geoTag,
					description,
					wiki,
				};
			});
		}

		case 'animal':
		case 'animals': {
			const animals = await Animal.find();
			console.log('getAnimals: ', animals);

			return animals.map(({ id, name, spotsRef, description, wiki }) => {
				spotsRef = spotsRef.map(spotId => spotId.toString());
				return {
					id,
					name,
					spotsRef,
					description,
					wiki,
				};
			});
		}

		case 'organizer':
		case 'organizers': {
			const organizers = await Organizer.find();
			console.log('getOrganizers: ', organizers);

			return organizers.map(
				({ id, name, url, description, spots, address, email, phone }) => {
					spots = spots.map(spot => {
						let { name, animalsRef, spotsRef } = spot;
						spotsRef = spotsRef.map(spotId => spotId.toString());
						animalsRef = animalsRef.map(animalId => animalId.toString());
						return { name, animalsRef, spotsRef };
					});

					return {
						id,
						name,
						url,
						description,
						spots,
						address,
						email,
						phone,
					};
				}
			);
		}

		default: {
			let resultsObject = {};

			const spotsFind = await Spot.find();
			const spots = spotsFind.map(({ id, name, country, geoTag, description, wiki }) => {
				return {
					id,
					name,
					country,
					geoTag,
					description,
					wiki,
				};
			});
			resultsObject = { ...resultsObject, spots };

			const animalsFind = await Animal.find();
			const animals = animalsFind.map(({ id, name, spotsRef, description, wiki }) => {
				spotsRef = spotsRef.map(spotId => spotId.toString());

				return {
					id,
					name,
					spotsRef,
					description,
					wiki,
				};
			});

			resultsObject = { ...resultsObject, animals };

			const organizersFind = await Organizer.find();
			const organizers = organizersFind.map(
				({ id, name, url, description, spots, address, email, phone }) => {
					spots = spots.map(spot => {
						let { name, animalsRef, spotsRef } = spot;
						spotsRef = spotsRef.map(spotId => spotId.toString());
						animalsRef = animalsRef.map(animalId => animalId.toString());
						return { name, animalsRef, spotsRef };
					});

					return {
						id,
						name,
						url,
						description,
						spots,
						address,
						email,
						phone,
					};
				}
			);
			resultsObject = { ...resultsObject, organizers };
			console.log('resultsObject: ', resultsObject);

			return resultsObject;
		}
	}
}
