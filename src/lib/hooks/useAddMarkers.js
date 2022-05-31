import { Cartesian3, Color, NearFarScalar } from 'cesium';
import useStore from './useStore';
import sluggify from '../../services/sluggify';

export default function useAddMarkers() {
	const data = useStore(state => state.dataStates);

	return function addMarkers(viewer) {
		data.spots.map(async element => {
			const animalsList = await data.animals
				.filter(animal => {
					return animal.spotsRef.includes(element.id) && animal.name;
				})
				.map(animal => {
					return `<li><a href="/list/animal/${sluggify(animal.name)}" target="_top">${
						animal.name
					}</a></li>`;
				});
			const animalsListHtml = await animalsList.join('');

			const organizersList = await data.organizers
				.filter(organizer => {
					const result = organizer.spots.find(location => {
						return location.spotsRef.includes(element.id) && organizer;
					});
					return result && organizer;
				})
				.map(organizer => {
					return `<li><a href="/list/organizer/${sluggify(
						organizer.name
					)}" target="_parent">${organizer.name}</a></li>`;
				});
			const organizersListHtml = await organizersList.join('');

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
						<h4>Latitude</h4>
						<p>${element.geoTag.latitude}</p>
						<h4>Longitude</h4>
						<p>${element.geoTag.longitude}</p>
				</section>

				<section>
					<h3>Description</h3>
					<p>${element.description}</p>
				</section>
				
				<section>
					<h3>Who lives here?</h3>
					<ul>
						${animalsListHtml}
					</ul>
				</section>
					
				<section>
					<h3>Organizers</h3>
					<ul>
						${organizersListHtml}
					</ul>
				</section>
				`,
				},
				(viewer.scene.globe.depthTestAgainstTerrain = false)
			);
		});
	};
}
