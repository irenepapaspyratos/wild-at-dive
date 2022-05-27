import useStore from '../src/lib/useStore';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../src/components/Map/Map'), {
	ssr: false,
});

export default function Home() {
	const fetchData = useStore(state => state.fetchData);

	useEffect(() => {
		fetchData(['spots', 'animals', 'organizers']);
	}, [fetchData]);

	return <Map />;
}
