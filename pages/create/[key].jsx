import PropTypes from 'prop-types';
import getDbData from '../../src/services/get-dbData';
import { useRouter } from 'next/router';
import FormCreateEdit from '../../src/components/FormCreateEdit/FromCreateEdit';

export async function getServerSideProps() {
	const dataObject = await getDbData();
	const { spots, animals, organizers } = dataObject;
	return {
		props: { spots, animals, organizers },
	};
}

export default function CreateEntry({ spots, animals, organizers }) {
	const data = { spots: spots, animals: animals, organizers: organizers };
	const router = useRouter();
	const key = router.query.key;

	return <FormCreateEdit creationKey={key} data={data} />;
}
CreateEntry.propTypes = {
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
