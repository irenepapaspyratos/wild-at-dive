import PropTypes from 'prop-types';
import getDbData from '../../../src/services/get-dbData';
import { useRouter } from 'next/router';
import FormCreateEdit from '../../../src/components/FormCreateEdit/FormCreateEdit';
import useStore from '../../../src/lib/hooks/useStore';

export async function getServerSideProps() {
	const dataObject = await getDbData();
	const { spots, animals, organizers } = dataObject;
	return {
		props: { spots, animals, organizers },
	};
}

export default function EditEntry({ spots, animals, organizers }) {
	const data = { spots: spots, animals: animals, organizers: organizers };
	const router = useRouter();
	const key = router.query.key;
	const id = router.query.key;
	const resetCheckedArrays = useStore(state => state.resetCheckedArrays);
	resetCheckedArrays();

	return <FormCreateEdit keyValue={key} id={id} data={data} />;
}
EditEntry.propTypes = {
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
