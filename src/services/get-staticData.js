import dataSpots from './static-spots.json';
import dataAnimals from './static-animals.json';
import dataOrganizers from './static-organizers.json';

function getStaticData(string) {
	if (string === 'spots') {
		return dataSpots;
	} else if (string === 'animals') {
		return dataAnimals;
	} else if (string === 'organizers') {
		return dataOrganizers;
	}
}

export default getStaticData;
