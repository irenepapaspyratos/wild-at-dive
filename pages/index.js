import useStore from '../src/lib/useStore';
import Map from '../src/components/Map/Map';
import { useEffect } from 'react';

export default function Home() {
	const fetchData = useStore(state => state.fetchData);

	useEffect(() => {
		fetchData('spots');
		fetchData('animals');
		fetchData('organizers');
	}, [fetchData]);

	return <Map />;
}
