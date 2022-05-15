import ElementList from './ElementList';

export default {
	title: 'Components/ElementList',
	component: ElementList,
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
	elements: [
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
	header: 'Organizer',
};

export function Default() {
	return <ElementList {...props} />;
}
