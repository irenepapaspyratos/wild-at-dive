import Spot from './Spot';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import data from '../../services/static-testData.json';

describe('Single Spot-Display', () => {
	it('renders every important detail of spot', () => {
		render(
			<Spot
				index={1}
				spots={data.spots}
				animals={data.animals}
				organizers={data.organizers}
			/>
		);

		const nameAnimal1 = screen.queryByText(/Dolphin/i);
		const nameAnimal2 = screen.queryByText(/Turtle/i);

		expect(nameAnimal1).toBeInTheDocument();
		expect(nameAnimal2).not.toBeInTheDocument();
	});

	it('renders only names of organizers at this location', () => {
		render(
			<Spot
				index={1}
				spots={data.spots}
				animals={data.animals}
				organizers={data.organizers}
			/>
		);

		const nameOrganizer1 = screen.queryByText(/Unexso/i);
		const nameOrganizer2 = screen.queryByText(/Silversea Cruises/i);
		const nameOrganizer3 = screen.queryByText(/Pacific Fleet/i);

		expect(nameOrganizer1).toBeInTheDocument();
		expect(nameOrganizer2).not.toBeInTheDocument();
		expect(nameOrganizer3).not.toBeInTheDocument();
	});
});
