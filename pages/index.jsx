import useStore from '../src/lib/hooks/useStore';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../src/components/Map/Map'), {
	ssr: false,
});

export default function Home() {
	const keyArray = useStore(state => state.keyArray);
	const fetchData = useStore(state => state.fetchData);

	useEffect(() => {
		fetchData(keyArray);
	}, [fetchData, keyArray]);

	return <Map />;
}
