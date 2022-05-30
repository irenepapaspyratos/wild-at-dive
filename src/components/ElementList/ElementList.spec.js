import ElementList from './ElementList';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import data from '../../services/static-testData.json';

describe("Display a header and a name-list of an array's elements", () => {
	it('renders a header and the names of array-elements', () => {
		render(<ElementList elements={data.organizers} header="organizers" />);

		const heading = screen.getByRole('link', { name: 'Pacific Fleet' });

		const elements = screen.getAllByRole('listitem');
		const element1 = screen.getByText(/Unexso/i);
		const element2 = screen.getByText(/Silversea Cruises/i);
		const element3 = screen.getByText(/Pacific Fleet/i);

		expect(heading).toBeInTheDocument();
		expect(elements.length).toBe(8);
		expect(element1).toBeInTheDocument();
		expect(element2).toBeInTheDocument();
		expect(element3).toBeInTheDocument();
	});
});
