import PropTypes from 'prop-types';

import Spot from '../src/components/Spot/Spot';
import getStaticData from '../src/services/get-staticData';

export async function getStaticProps() {
	const spots = await getStaticData('spots');
	const animals = await getStaticData('animals');
	const organizers = await getStaticData('organizers');

	return { props: { spots: spots, animals: animals, organizers: organizers } };
}

export default function Home({ spots, animals, organizers }) {
	return <Spot spot={{ ...spots[0] }} animals={animals} orgsnizers={organizers} />;
}

Home.propTypes = {
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
