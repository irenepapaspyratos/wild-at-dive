import { createWorldTerrain, Viewer } from 'cesium';
import AddMarkers from './add-markers';

export default function map() {
	const childNo = document.getElementsByClassName('cesium-viewer');

	if (childNo.length == 0) {
		const viewer = new Viewer('cesiumContainer', {
			terrainProvider: createWorldTerrain(),
		});

		viewer && AddMarkers(viewer);
	}
}
