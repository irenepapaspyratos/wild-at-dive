import Animal from './Animal';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Single Animal-Display', () => {
	it('renders every important detail of animal', () => {
		render(
			<Animal
				spots={[
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
					{
						id: '4',
						name: 'Socorro Islands',
						country: 'Mexico',
						geoTag: { latitude: '18.792742', longitude: '-110.982031' },
						description: 'nice and warm',
					},
				]}
				animal={{
					id: '1',
					name: 'Dolphin',
					spots: ['Gran Bahama', 'Bimini', 'Galápagos'],
					description: 'friendly, very intelligent, likes to play',
				}}
				organizers={[
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
							{
								name: 'Socorro Islands',
								area: 'Colima, Revillagigedo Archipelago',
								animals: ['Shark', 'Dolphin'],
							},
						],
					},
					{
						id: '3',
						name: 'Pacific Fleet',
						spots: [
							{
								name: 'Neptun Islands',
								area: 'South Australia, Spencer Gulf',
								animals: ['Shark'],
							},
						],
					},
				]}
			/>
		);

		const animalDetail1 = screen.getByRole('heading', { name: 'Dolphin' });
		const animalDetail2 = screen.queryByText(/Gran Bahama/i);
		const animalDetail3 = screen.queryByText(/Bimini/i);
		const animalDetail4 = screen.queryByText(/Galápagos/i);
		const animalDetail5 = screen.queryByText(/friendly, very intelligent, likes to play/i);

		expect(animalDetail1).toBeInTheDocument();
		expect(animalDetail2).toBeInTheDocument();
		expect(animalDetail3).toBeInTheDocument();
		expect(animalDetail4).toBeInTheDocument();
		expect(animalDetail5).toBeInTheDocument();
	});

	it('renders only names of spots where animal lives', () => {
		render(
			<Animal
				spots={[
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
					{
						id: '4',
						name: 'Socorro Islands',
						country: 'Mexico',
						geoTag: { latitude: '18.792742', longitude: '-110.982031' },
						description: 'nice and warm',
					},
				]}
				animal={{
					id: '1',
					name: 'Dolphin',
					spots: ['Gran Bahama', 'Bimini', 'Galápagos'],
					description: 'friendly, very intelligent, likes to play',
				}}
				organizers={[
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
							{
								name: 'Socorro Islands',
								area: 'Colima, Revillagigedo Archipelago',
								animals: ['Shark', 'Dolphin'],
							},
						],
					},
					{
						id: '3',
						name: 'Pacific Fleet',
						spots: [
							{
								name: 'Neptun Islands',
								area: 'South Australia, Spencer Gulf',
								animals: ['Shark'],
							},
						],
					},
				]}
			/>
		);

		const nameSpot1 = screen.queryByText(/Bimini/i);
		const nameSpot2 = screen.queryByText(/Gran Bahama/i);
		const nameSpot3 = screen.queryByText(/Socorro Islands/i);

		expect(nameSpot1).toBeInTheDocument();
		expect(nameSpot2).toBeInTheDocument();
		expect(nameSpot3).not.toBeInTheDocument();
	});

	it('renders only names of organizers who arrange diving with animal', () => {
		render(
			<Animal
				spots={[
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
					{
						id: '4',
						name: 'Socorro Islands',
						country: 'Mexico',
						geoTag: { latitude: '18.792742', longitude: '-110.982031' },
						description: 'nice and warm',
					},
				]}
				animal={{
					id: '1',
					name: 'Dolphin',
					spots: ['Gran Bahama', 'Bimini', 'Galápagos'],
					description: 'friendly, very intelligent, likes to play',
				}}
				organizers={[
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
							{
								name: 'Socorro Islands',
								area: 'Colima, Revillagigedo Archipelago',
								animals: ['Shark', 'Dolphin'],
							},
						],
					},
					{
						id: '3',
						name: 'Pacific Fleet',
						spots: [
							{
								name: 'Neptun Islands',
								area: 'South Australia, Spencer Gulf',
								animals: ['Shark'],
							},
						],
					},
				]}
			/>
		);

		const nameOrganizer1 = screen.queryByText(/Unexso/i);
		const nameOrganizer2 = screen.queryByText(/Silversea Cruises/i);
		const nameOrganizer3 = screen.queryByText(/Pacific Fleet/i);

		expect(nameOrganizer1).toBeInTheDocument();
		expect(nameOrganizer2).toBeInTheDocument();
		expect(nameOrganizer3).not.toBeInTheDocument();
	});
});
