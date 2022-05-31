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
				viewer && addMarkers(viewer);
				viewer.infoBox.frame.setAttribute(
					'sandbox',
					'allow-same-origin allow-popups allow-forms allow-top-navigation allow-top-navigation-by-user-activation'
				);
				viewer.infoBox.frame.contentWindow.location.reload();
			}
		}
	}, [addMarkers, cesiumContainerRef]);

	return <MapContainer ref={cesiumContainerRef} id="cesiumContainer" />;
}

export default Map;
