import MapContainer from '../ui/MapContainer/MapContainer.styled';
import { useRef, useEffect } from 'react';
import { createWorldTerrain, Viewer } from 'cesium';
import useAddMarkers from '../../lib/hooks/useAddMarkers';

function Map() {
	const addMarkers = useAddMarkers();
	const cesiumContainerRef = useRef();

	useEffect(() => {
		if (cesiumContainerRef.current) {
			const childNo = cesiumContainerRef.current.querySelector('.cesium-viewer');

			if (!childNo) {
				const viewer = new Viewer('cesiumContainer', {
					terrainProvider: createWorldTerrain(),
				});
				viewer.scene.camera.moveBackward(4000000);
				console.log(viewer);
				viewer && addMarkers(viewer);
			}
		}
	}, [addMarkers, cesiumContainerRef]);

	return <MapContainer ref={cesiumContainerRef} id="cesiumContainer" />;
}

export default Map;
