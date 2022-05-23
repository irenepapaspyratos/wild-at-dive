import PropTypes from 'prop-types';

import getStaticData from '../src/services/get-staticData';
import Spot from '../src/components/Spot/Spot';
import Animal from '../src/components/Animal/Animal';
import Organizer from '../src/components/Organizer/Organizer';
import ElementList from '../src/components/ElementList/ElementList';
import Map from '../src/components/Map/Map';
import useStore from '../src/lib/useStore';
import { useEffect } from 'react';

export function getStaticProps() {
	const spots = getStaticData('spots');
	const animals = getStaticData('animals');
	const organizers = getStaticData('organizers');

	return { props: { spots: spots, animals: animals, organizers: organizers } };
}

export default function Home({ spots, animals, organizers }) {
	const fetchData = useStore(state => state.fetchData);
	const dataStates = useStore(state => state.dataStates);

	console.log(dataStates);

	useEffect(() => {
		fetchData('spots');
		fetchData('animals');
		fetchData('organizers');
	}, [fetchData]);
	return (
		<>
			<Spot
				// spot[1] als Prop gibt geoTag.longitude aus, mit useStore aber nicht!!!
				spot={{ ...spots[1] }}
				animals={dataStates.animals}
				organizers={organizers}
			/>
			<Animal spots={spots} animal={{ ...animals[0] }} organizers={organizers} />
			<Organizer organizer={{ ...organizers[2] }} animals={animals} />
			<ElementList elements={spots} header="Spots" />
			<ElementList elements={animals} header="Animals" />
			<ElementList elements={organizers} header="Organizers" />
			<Map />
		</>
	);
}

Home.propTypes = {
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
