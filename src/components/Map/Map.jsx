import MapContainer from '../ui/MapContainer/MapContainer.styled';
import { useRef, useEffect } from 'react';
import useStore from '../../lib/hooks/useStore';
import { createWorldTerrain, Viewer, Ion } from 'cesium';
import useAddMarkers from '../../lib/hooks/useAddMarkers';
import useSWR from 'swr';

function Map() {
	const keyArray = useStore(state => state.keyArray);
	const setData = useStore(state => state.setData);
	const { data: spots, errorSpots } = useSWR('/api/list/spots');
	const { data: animals, errorAnimals } = useSWR('/api/list/animals');
	const { data: organizers, errorOrganizers } = useSWR('/api/list/organizers');
	errorSpots && <h3>Error: {errorSpots.message}</h3>;
	errorAnimals && <h3>Error: {errorAnimals.message}</h3>;
	errorOrganizers && <h3>Error: {errorOrganizers.message}</h3>;
	const addMarkers = useAddMarkers(spots, animals, organizers);
	const cesiumContainerRef = useRef();
	const Ion.defaultAccessToken = process.env.CESIUM_TOKEN;

	useEffect(() => {
		if (cesiumContainerRef.current) {
			const childNo = cesiumContainerRef.current.querySelector('.cesium-viewer');

			if (!childNo) {
				const viewer = new Viewer('cesiumContainer', {
					terrainProvider: createWorldTerrain(),
				});
				viewer.scene.camera.moveBackward(4000000);
				viewer && addMarkers(viewer);
				setTimeout(() => {
					viewer.infoBox.frame.setAttribute(
						'sandbox',
						'allow-same-origin allow-popups allow-forms allow-top-navigation allow-top-navigation-by-user-activation'
					);
					viewer.infoBox.frame.contentWindow.location.reload();
				}, 1000);
			}
		}
		setData(keyArray, [spots, animals, organizers]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addMarkers, cesiumContainerRef]);

	return (
		<>
			<MapContainer ref={cesiumContainerRef} id="cesiumContainer" />{' '}
		</>
	);
}

export default Map;
