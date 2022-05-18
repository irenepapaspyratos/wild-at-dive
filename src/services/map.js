import { createWorldTerrain, Viewer } from 'cesium';

export default function map() {
	const childNo = document.getElementsByClassName('cesium-viewer');
	console.log(childNo);
	if (childNo.length == 0) {
		const viewer = new Viewer('cesiumContainer', {
			terrainProvider: createWorldTerrain(),
		});
		viewer && console.log(childNo);
	}
}
