import ElementList from './ElementList';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe("Display a header and a name-list of an array's elements", () => {
	it('renders a header and the names of array-elements', () => {
		render(
			<ElementList
				elements={[
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
				]}
				header="Organizer"
			/>
		);

		const heading = screen.getByRole('heading', { name: 'Organizer' });

		const elements = screen.getAllByRole('listitem');
		const element1 = screen.getByText(/Unexso/i);
		const element2 = screen.getByText(/Silversea Cruises/i);
		const element3 = screen.getByText(/Pacific Fleet/i);

		expect(heading).toBeInTheDocument();
		expect(elements.length).toBe(3);
		expect(element1).toBeInTheDocument();
		expect(element2).toBeInTheDocument();
		expect(element3).toBeInTheDocument();
	});
});
