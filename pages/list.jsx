import useStore from '../src/lib/hooks/useStore';
import { useEffect } from 'react';

import ElementList from '../src/components/ElementList/ElementList';

export default function ListAll() {
	const keyArray = useStore(state => state.keyArray);
	const data = useStore(state => state.dataStates);
	const fetchData = useStore(state => state.fetchData);

	useEffect(() => {
		fetchData(keyArray);
	}, [fetchData, keyArray]);

	return (
		<>
			{keyArray.map(keyValue => {
				return <ElementList key={keyValue} elements={data[keyValue]} header={keyValue} />;
			})}
		</>
	);
}
