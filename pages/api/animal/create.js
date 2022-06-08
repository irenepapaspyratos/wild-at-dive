import { dbConnect } from '../../../src/lib/db/database';
import Animal from '../../../src/models/Animal';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body);
		await dbConnect();

		const newAnimal = await Animal.create({
			name: data.name,
			spotsRef: data.checkedRefs.spots,
			description: data.description,
			wiki: data.wiki,
		});

		res.status(200).json({
			message: 'New Animal created',
			entry: newAnimal,
		});
	} else {
		res.status(400).json({ error: 'wrong method' });
	}
}
