import Spot from '../models/Spot';
import Animal from '../models/Animal';
import Organizer from '../models/Organizer';

import { dbConnect } from '../lib/db/database';

export default async function getDbData(identifier) {
	await dbConnect();

	switch (identifier) {
		case 'spot': {
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

		case 'animal': {
			const animalsFind = await Animal.find();

			const animalsRaw = animalsFind.map(({ id, name, spotsRef, description, wiki }) => {
				return {
					id,
					name,
					spotsRef,
					description,
					wiki,
				};
			});
			const animals = animalsRaw.map(animal => {
				animal.spotsRef = animal.spotsRef.map(ref =>
					JSON.stringify(ref).replaceAll('"', '')
				);
				return animal;
			});

			console.log('getAnimals: ', animals);

			return animals;
		}

		case 'organizer': {
			const organizersFind = await Organizer.find();

			const organizersRaw = organizersFind.map(
				({ id, name, url, description, spots, address, email, phone }) => {
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
			const organizers = organizersRaw.map(organizer => {
				organizer.spotsRef = organizer.spots.forEach(
					spot =>
						(spot.spotsRef = JSON.stringify(spot.spotsRef)
							.replaceAll('"', '')
							.replaceAll('[', '')
							.replaceAll(']', ''))
				);
				return organizer;
			});
			console.log('getOrganizers: ', organizers);

			return organizers;
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
			console.log(spots);
			resultsObject = { ...resultsObject, spots };

			const animalsFind = await Animal.find();
			const animalsRaw = animalsFind.map(({ id, name, spotsRef, description, wiki }) => {
				return {
					id,
					name,
					spotsRef,
					description,
					wiki,
				};
			});
			const animals = animalsRaw.map(animal => {
				animal.spotsRef = animal.spotsRef.map(ref =>
					JSON.stringify(ref).replaceAll('"', '')
				);
				return animal;
			});
			resultsObject = { ...resultsObject, animals };

			const organizersFind = await Organizer.find();
			const organizersRaw = organizersFind.map(
				({ id, name, url, description, spots, address, email, phone }) => {
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
			const organizers = organizersRaw.map(organizer => {
				organizer.spotsRef = organizer.spots.forEach(
					spot =>
						(spot.spotsRef = JSON.stringify(spot.spotsRef)
							.replaceAll('"', '')
							.replaceAll('[', '')
							.replaceAll(']', ''))
				);
				return organizer;
			});
			resultsObject = { ...resultsObject, organizers };
			console.log('resultsObject: ', resultsObject);

			return resultsObject;
		}
	}
}
