import Animal from './Animal';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import data from '../../services/static-testData.json';

describe('Single Animal-Display', () => {
	it('renders every important detail of animal', () => {
		render(
			<Animal
				index={0}
				spots={data.spots}
				animals={data.animals}
				organizers={data.organizers}
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
				index={0}
				spots={data.spots}
				animals={data.animals}
				organizers={data.organizers}
			/>
		);

		const nameSpot1 = screen.queryByText(/Bimini/i);
		const nameSpot2 = screen.queryByText(/Gran Bahama/i);
		const nameSpot3 = screen.queryByText(/Rostock/i);

		expect(nameSpot1).toBeInTheDocument();
		expect(nameSpot2).toBeInTheDocument();
		expect(nameSpot3).not.toBeInTheDocument();
	});

	it('renders only names of organizers who arrange diving with animal', () => {
		render(
			<Animal
				index={0}
				spots={data.spots}
				animals={data.animals}
				organizers={data.organizers}
			/>
		);

		const nameOrganizer1 = screen.queryByText(/Pacific Fleet/i);
		const nameOrganizer2 = screen.queryByText(/Silversea Cruises/i);
		const nameOrganizer3 = screen.queryByText(/Diving Pico/i);

		expect(nameOrganizer1).toBeInTheDocument();
		expect(nameOrganizer2).toBeInTheDocument();
		expect(nameOrganizer3).not.toBeInTheDocument();
	});
});
