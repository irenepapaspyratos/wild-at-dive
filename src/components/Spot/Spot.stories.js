import Spot from './Spot';

export default {
	title: 'Components/Spot',
	component: Spot,
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
	spot: {
		id: '2',
		name: 'Gran Bahama',
		country: 'Bahamas',
		geoTag: { latitude: '26.661393', longitude: '-78.268353' },
		description: 'nice and warm',
	},
	animals: [
		{
			id: '1',
			name: 'Dolphin',
			spots: ['Gran Bahama', 'Bimini', 'Galápagos'],
			description: 'friendly, very intelligent, likes to play',
		},
		{
			id: '2',
			name: 'Shark',
			spots: ['Galápagos', 'Socorro Islands'],
			description:
				'despite of persistent rumors, sharks are NOT aggressiv, but maybe a bit hungry from time to time..',
		},
	],
	organizers: [
		{
			id: '1',
			name: 'Unexso',
			spots: [
				{
					name: 'Freeport',
					area: 'Gran Bahama',
					animals: ['Dolphin'],
				},
			],
		},
		{
			id: '2',
			name: 'Silversea Cruises',
			spots: [
				{
					name: 'San Cristóbal',
					area: 'Galápagos',
					animals: ['Dolphin', 'Shark'],
				},
			],
		},
		{
			id: '3',
			name: 'Pacific Fleet',
			spots: [
				{
					name: 'Socorro Islands',
					area: 'Colima, Revillagigedo Archipelago',
					animals: ['Shark, Dolphin'],
				},
				{
					name: 'Neptun Islands',
					area: 'South Australia, Spencer Gulf',
					animals: 'Shark',
				},
			],
		},
	],
};

export function Default() {
	return <Spot {...props} />;
}
