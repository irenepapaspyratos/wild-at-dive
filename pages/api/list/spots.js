import getDbData from '../../../src/services/get-dbData';

export default async function handler(req, response) {
	const spots = await getDbData('spot');

	response.status(200).json(spots);
}
