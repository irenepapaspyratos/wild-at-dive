import useStore from '../../src/lib/hooks/useStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import ElementList from '../../src/components/ElementList/ElementList';

export default function ListAll() {
	const router = useRouter();
	const keyArray = useStore(state => state.keyArray);
	const data = useStore(state => state.dataStates);
	const fetchData = useStore(state => state.fetchData);
	const key = router.query.key;
	const keyS = `${key}s`;

	useEffect(() => {
		fetchData(keyArray);
	}, [fetchData, keyArray]);

	const keyValue = keyArray.includes(key) ? key : keyS;
	return key && <ElementList key={keyValue} elements={data[keyValue]} header={keyValue} />;
}
