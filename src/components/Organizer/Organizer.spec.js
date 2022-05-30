import Organizer from './Organizer';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import data from '../../services/static-testData.json';

describe('Single Organizer-Display', () => {
	it('renders name. location-names and animal-names of organizer', () => {
		render(
			<Organizer
				index={2}
				spots={data.spots}
				animals={data.animals}
				organizers={data.organizers}
			/>
		);

		const nameOrganizer = screen.getByRole('heading', { name: 'Pacific Fleet' });

		const nameSpot1 = screen.getByRole('heading', { name: 'Socorro Islands' });
		const nameSpot2 = screen.getByRole('heading', { name: 'Neptun Islands' });
		const nameSpot3 = screen.queryByText(/Freeport/i);

		const nameAnimal1 = screen.getAllByText(/Dolphin/i);
		const nameAnimal2 = screen.getAllByText(/Shark/i);
		const nameAnimal3 = screen.queryByText(/Ray/i);

		expect(nameOrganizer).toBeInTheDocument();
		expect(nameSpot1).toBeInTheDocument();
		expect(nameSpot2).toBeInTheDocument();
		expect(nameSpot3).not.toBeInTheDocument();
		expect(nameAnimal1.length).toBe(1);
		expect(nameAnimal2.length).toBe(2);
		expect(nameAnimal3).not.toBeInTheDocument();
	});
});
