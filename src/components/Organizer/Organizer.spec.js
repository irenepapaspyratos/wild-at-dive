import Organizer from './Organizer';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Single Spot-Display', () => {
	it('renders name. location-names and animal-names of organizer', () => {
		render(
			<Organizer
				organizer={{
					id: '3',
					name: 'Pacific Fleet',
					spots: [
						{
							name: 'Socorro Islands',
							area: 'Colima, Revillagigedo Archipelago',
							animals: ['Dolphin', 'Shark'],
						},
						{
							name: 'Neptun Islands',
							area: 'South Australia, Spencer Gulf',
							animals: ['Shark'],
						},
						{
							name: 'Freeport',
							area: 'Gran Bahama',
							animals: ['Dolphin'],
						},
					],
				}}
			/>
		);

		const nameOrganizer = screen.getByRole('heading', { name: 'Pacific Fleet' });

		const nameSpot1 = screen.getByRole('heading', { name: 'Socorro Islands' });
		const nameSpot2 = screen.getByRole('heading', { name: 'Neptun Islands' });
		const nameSpot3 = screen.getByRole('heading', { name: 'Freeport' });

		const nameAnimal1 = screen.getAllByText(/Dolphin/i);
		const nameAnimal2 = screen.getAllByText(/Shark/i);

		expect(nameOrganizer).toBeInTheDocument();
		expect(nameSpot1).toBeInTheDocument();
		expect(nameSpot2).toBeInTheDocument();
		expect(nameSpot3).toBeInTheDocument();
		expect(nameAnimal1.length).toBe(2);
		expect(nameAnimal2.length).toBe(2);
	});
});
