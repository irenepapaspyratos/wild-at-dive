import useStore from '../../src/lib/hooks/useStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import FormCreateEdit from '../../src/components/FormCreateEdit/FromCreateEdit';

export default function CreateEntry() {
	const router = useRouter();
	const keyArray = useStore(state => state.keyArray);
	const data = useStore(state => state.dataStates);
	const fetchData = useStore(state => state.fetchData);
	const key = router.query.key;

	useEffect(() => {
		fetchData(keyArray);
	}, [fetchData, keyArray]);

	return (
		<FormCreateEdit
			creationKey={key}
			spots={data.spots}
			animals={data.animals}
			organizers={data.organizers}
		/>
	);
}
