import PropTypes from 'prop-types';

export default function Spot({ spot, animals, organizers }) {
	return (
		<article>
			<header>
				<h2>{spot.name}</h2>
				<p>{spot.country}</p>
			</header>

			<section>
				<h3>Geo-Tag</h3>
				<div>
					<h4>Latitude</h4>
					<p>{spot.geoTag.latitude}</p>
				</div>
				<div>
					<h4>Longitude</h4>
					<p>{spot.geoTag.longitude}</p>
				</div>
			</section>

			<section>
				<h3>Description</h3>
				<p>{spot.description}</p>
			</section>

			<section>
				<h3>Who lives here?</h3>
				<ul>
					{animals
						.filter(animal => {
							return animal.spots.includes(spot.name) && animal.name;
						})
						.map(animal => {
							return <li key={animal.id}>{animal.name}</li>;
						})}
				</ul>
			</section>

			<section>
				<h3>Organizers</h3>
				<ul>
					{organizers.map(organizer => {
						let varloc = false;
						organizer.spots.forEach(location => {
							varloc = location.name === spot.name || location.area === spot.name;
						});
						return varloc && <li key={organizer.id}>{organizer.name}</li>;
					})}
				</ul>
			</section>
		</article>
	);
}

Spot.propTypes = {
	spot: PropTypes.object,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
