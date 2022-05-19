import Map from './Map';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export default {
	title: 'Components/Map',
	component: Map,
	decorators: [
		Story => {
			return (
				<>
					<div
						id="cesiumContainer"
						style={{ padding: '3em', width: '400px', height: '400px' }}
					/>
					<Story />
				</>
			);
		},
	],
};

export function Default() {
	return <Map />;
}
