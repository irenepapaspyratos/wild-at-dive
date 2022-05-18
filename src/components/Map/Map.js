import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../services/map'), {
	ssr: false,
});

export default Map;
