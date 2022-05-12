import Spot from './Spot';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Single Spot-Display', () => {
	it('renders every important detail of spot & the names of animals living there & NOT the names of animals not living there & the names of organiz', () => {
		render(
			<Spot
				spot={{
					id: '2',
					name: 'Gran Bahama',
					country: 'Bahamas',
					geoTag: { latitude: '26.661393', longitude: '-78.268353' },
					description: 'nice and warm',
				}}
				animals={[
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
				]}
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
								animals: ['Shark, Dolphin'],
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
							{
								name: 'Freeport',
								area: 'Gran Bahama',
								animals: ['Dolphin'],
							},
						],
					},
				]}
			/>
		);

		const spotDetail1 = screen.queryByText(/Gran Bahama/i);
		const spotDetail2 = screen.queryByText(/Bahamas/i);
		const spotDetail3 = screen.queryByText(/26.661393/i);
		const spotDetail4 = screen.queryByText(/-78.268353/i);
		const spotDetail5 = screen.queryByText(/nice and warm/i);

		const nameAnimal1 = screen.queryByText(/Dolphin/i);
		const nameAnimal2 = screen.queryByText(/Shark/i);

		const nameOrganizer1 = screen.queryByText(/Unexso/i);
		const nameOrganizer2 = screen.queryByText(/Silversea Cruises/i);
		const nameOrganizer3 = screen.queryByText(/Pacific Fleet/i);

		expect(spotDetail1).toBeInTheDocument();
		expect(spotDetail2).toBeInTheDocument();
		expect(spotDetail3).toBeInTheDocument();
		expect(spotDetail4).toBeInTheDocument();
		expect(spotDetail5).toBeInTheDocument();

		expect(nameAnimal1).toBeInTheDocument();
		expect(nameAnimal2).not.toBeInTheDocument();

		expect(nameOrganizer1).toBeInTheDocument();
		expect(nameOrganizer2).not.toBeInTheDocument();
		expect(nameOrganizer3).toBeInTheDocument();
	});
});
