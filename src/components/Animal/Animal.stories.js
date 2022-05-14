import Animal from './Animal';

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
	spots: [
		{
			id: '1',
			name: 'Bimini',
			country: 'Bahamas',
			geoTag: { latitude: '25.703188', longitude: '-79.281459' },
			description: 'nice and warm',
		},
		{
			id: '2',
			name: 'Gran Bahama',
			country: 'Bahamas',
			geoTag: { latitude: '26.661393', longitude: '-78.268353' },
			description: 'nice and warm',
		},
		{
			id: '3',
			name: 'Galápagos',
			country: 'Ecuador',
			geoTag: { latitude: '-0.628815', longitude: '-90.363875' },
			description: 'nice and warm',
		},
	],
	animal: {
		id: '1',
		name: 'Dolphin',
		spots: ['Gran Bahama', 'Bimini', 'Galápagos'],
		description: 'friendly, very intelligent, likes to play',
	},
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
					animals: ['Shark', 'Dolphin'],
				},
				{
					name: 'Neptun Islands',
					area: 'South Australia, Spencer Gulf',
					animals: ['Shark'],
				},
			],
		},
	],
};

export function Default() {
	return <Animal {...props} />;
}
