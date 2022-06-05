export default function getStaticQueries(identifier, queryElement, queryArrayA, queryArrayB) {
	// Order: spot - animal - organizer

	let resultArrayA = [];
	let resultArrayB = [];

	switch (identifier) {
		case 'spot': {
			resultArrayA = queryArrayA
				.filter(animal => {
					return animal.spotsRef.includes(queryElement.id) && animal.name;
				})
				.map(animal => {
					return { id: animal.id, name: animal.name };
				});
			resultArrayB = queryArrayB
				.filter(organizer => {
					const result = organizer.spots.find(location => {
						return location.spotsRef.includes(queryElement.id) && organizer;
					});
					return result && organizer;
				})
				.map(organizer => {
					return { id: organizer.id, name: organizer.name };
				});
			break;
		}
		case 'animal': {
			resultArrayA = queryArrayA
				.filter(spot => {
					return queryElement.spotsRef.includes(spot.id) && spot;
				})
				.map(spot => {
					return { id: spot.id, name: spot.name };
				});
			resultArrayB = queryArrayB
				.filter(organizer => {
					const result = organizer.spots.find(location => {
						return location.animals?.includes(queryElement.id) && organizer;
					});
					return result && organizer;
				})
				.map(organizer => {
					const spotRefs = organizer.spots.map(location => location.spotsRef);
					return { id: organizer.id, name: organizer.name, spotRefs: spotRefs.join() };
				});
			break;
		}
	}
	return [resultArrayA, resultArrayB];
}
