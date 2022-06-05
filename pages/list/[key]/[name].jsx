import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import getDbData from '../../../src/services/get-dbData';
import sluggify from '../../../src/services/sluggify';
import Spot from '../../../src/components/Spot/Spot';
import Animal from '../../../src/components/Animal/Animal';
import Organizer from '../../../src/components/Organizer/Organizer';

export async function getServerSideProps() {
	const dataObject = await getDbData();
	const { spots, animals, organizers } = dataObject;
	return {
		props: { spots, animals, organizers },
	};
}

export default function SingleListEntry({ spots, animals, organizers }) {
	const data = { spots: spots, animals: animals, organizers: organizers };
	const router = useRouter();
	const key = router.query.key;
	const keyS = `${key}s`;

	const indexFound = data[keyS]?.findIndex(element => {
		return sluggify(element.name) === router.query.name && element.id;
	});

	return (
		<>
			{key === 'spot' && (
				<Spot
					index={indexFound}
					spots={data.spots}
					animals={data.animals}
					organizers={data.organizers}
				/>
			)}
			{key === 'animal' && (
				<Animal
					index={indexFound}
					spots={data.spots}
					animals={data.animals}
					organizers={data.organizers}
				/>
			)}
			{key === 'organizer' && (
				<Organizer index={indexFound} animals={data.animals} organizers={data.organizers} />
			)}
		</>
	);
}

SingleListEntry.propTypes = {
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
