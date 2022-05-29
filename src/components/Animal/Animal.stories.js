import Animal from './Animal';
import data from '../../services/static-testData.json';

export default {
	title: 'Components/Animal',
	component: Animal,
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
	return <Animal {...props} />;
}
