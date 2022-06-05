import getDbData from '../../../src/services/get-dbData';

export default async function handler(req, response) {
	const organizer = await getDbData('organizer');

	response.status(200).json(organizer);
}
