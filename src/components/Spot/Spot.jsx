import PropTypes from 'prop-types';

export default function Spot({ spot, animals, organizers }) {
	console.log(organizers);
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
				<h3>Who lives here?</h3>
				<div>
					<p>
						{animals
							.filter(animal => {
								return animal.spots.includes(spot.name) && animal.name;
							})
							.map(animal => {
								return <p key={animal.id}>{animal.name}</p>;
							})}
					</p>
					<h4>animals</h4>
				</div>
			</section>
		</article>
	);
}

Spot.propTypes = {
	spot: PropTypes.object,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
