import { Cartesian3, Color, NearFarScalar } from 'cesium';
import useStore from '../lib/useStore';

export default function AddMarkers(viewer) {
	const data = useStore(state => state.dataStates);

	data.spots.map(async element => {
		viewer.entities.add(
			{
				id: element.id,
				name: element.name,
				show: true,
				position: Cartesian3.fromDegrees(
					parseFloat(element.geoTag.longitude),
					parseFloat(element.geoTag.latitude)
				),
				point: {
					color: Color.YELLOW,
					pixelSize: 16,
					scaleByDistance: new NearFarScalar(1.5e2, 2, 1.5e7, 0.55),
				},
			},
			(viewer.scene.globe.depthTestAgainstTerrain = false)
		);
	});
}
