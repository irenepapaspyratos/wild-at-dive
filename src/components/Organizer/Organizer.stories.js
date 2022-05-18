import Organizer from './Organizer';

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
	organizer: {
		id: '3',
		name: 'Pacific Fleet',
		description: 'friendly people, good service',
		spots: [
			{
				name: 'Socorro Islands',
				area: 'Colima, Revillagigedo Archipelago',
				animals: ['Shark', 'Dolphin'],
			},
			{
				name: 'Neptun Islands',
				area: 'South Australia, Spencer Gulf',
				animals: ['Shark'],
			},
		],
	},
};

export function Default() {
	return <Organizer {...props} />;
}
