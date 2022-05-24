import { Cartesian3, Color, NearFarScalar } from 'cesium';
import useStore from '../lib/useStore';

export default function AddMarkers(viewer) {
	const data = useStore(state => state.dataStates);

	data.spots.map(async element => {
		const animalsList = await data.animals
			.filter(animal => {
				return animal.spotsRef.includes(element.id) && animal.name;
			})
			.map(animal => {
				return `<li key=${animal.id}>${animal.name}</li>`;
			});
		const aList = await animalsList.join('');

		const organizersList = await data.organizers
			.filter(organizer => {
				const result = organizer.spots.find(location => {
					return location.spotsRef.includes(element.id) && organizer;
				});
				return result && organizer;
			})
			.map(organizer => {
				return `<li key=${organizer.id}>${organizer.name}</li>`;
			});
		const oList = await organizersList.join('');

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
				description: `
				<header>
					<h2>${element.country}</h2>
				</header>

				<section>
					<h3>Geo-Tag</h3>
					<div>
						<h4>Latitude</h4>
						<p>${element.geoTag.latitude}</p>
					</div>
					<div>
						<h4>Longitude</h4>
						<p>${element.geoTag.longitude}</p>
					</div>
				</section>

				<section>
					<h3>Description</h3>
					<p>${element.description}</p>
				</section>
				
				<section>
					<h3>Who lives here?</h3>
					<ul>
						${aList}
					</ul>
				</section>
					
				<section>
					<h3>Organizers</h3>
					<ul>
						${oList}
					</ul>
				</section>
				`,
			},
			(viewer.scene.globe.depthTestAgainstTerrain = false)
		);
	});
}
