import getDbData from '../../../src/services/get-dbData';

export default async function handler(req, response) {
	const animal = await getDbData('animal');

	response.status(200).json(animal);
}
