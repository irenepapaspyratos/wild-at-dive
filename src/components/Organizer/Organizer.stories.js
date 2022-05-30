import Organizer from './Organizer';
import data from '../../services/static-testData.json';

export default {
	title: 'Components/Organizer',
	component: Organizer,
	decorators: [
		Story => {
			return (
				<div style={{ padding: '3em', maxWidth: '400px' }}>
					<Story />
				</div>
			);
		},
	],
};

const props = {
	index: 1,
	spots: data.spots,
	animals: data.animals,
	organizers: data.organizers,
};

export function Default() {
	return <Organizer {...props} />;
}
