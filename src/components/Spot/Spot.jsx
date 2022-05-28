import PropTypes from 'prop-types';
import getStaticQueries from '../../services/get-staticQueries';

export default function Spot({ index, spots, animals, organizers }) {
	const spot = spots[index];
	const queries = getStaticQueries('spot', spot, animals, organizers);

	return (
		<article>
			<header>
				<h2>{spot?.name}</h2>
				<p>{spot?.country}</p>
			</header>

			<section>
				<h3>Geo-Tag</h3>
				<div>
					<h4>Latitude</h4>
					<p>{spot?.geoTag?.latitude}</p>
				</div>
				<div>
					<h4>Longitude</h4>
					<p>{spot?.geoTag?.longitude}</p>
				</div>
			</section>

			<section>
				<h3>Description</h3>
				<p>{spot?.description}</p>
			</section>

			<section>
				<h3>Who lives here?</h3>
				<ul>
					{queries[0].map(animal => (
						<li key={animal.id}>{animal.name}</li>
					))}
				</ul>
			</section>

			<section>
				<h3>Organizers</h3>
				<ul>
					{queries[1].map(organizer => (
						<li key={organizer.id}>{organizer.name}</li>
					))}
				</ul>
			</section>
		</article>
	);
}

Spot.propTypes = {
	index: PropTypes.number,
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
