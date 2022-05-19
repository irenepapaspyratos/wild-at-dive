import MapContainer from '../ui/MapContainer/MapContainer.styled';
import dynamic from 'next/dynamic';

function Map() {
	const Globe = dynamic(() => import('../../services/map'), {
		ssr: false,
	});

	return (
		<>
			<MapContainer id="cesiumContainer" />
			<Globe />
		</>
	);
}

export default Map;
