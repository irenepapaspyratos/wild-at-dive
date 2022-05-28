import PropTypes from 'prop-types';
import getStaticQueries from '../../services/get-staticQueries';

export default function Animal({ index, spots, animals, organizers }) {
	const animal = animals[index];
	const queries = getStaticQueries('animal', animal, spots, organizers);

	const findOrganizers = spotToCheck => {
		const location = spots.find(spot => spot.id === spotToCheck.id);
		const spotQuery = getStaticQueries('spot', location, animals, organizers);
		return spotQuery[1];
	};

	return (
		<article>
			<header>
				<h2>{animal?.name}</h2>
			</header>

			<section>
				<h3>Description</h3>
				<p>{animal?.description}</p>
			</section>

			<section>
				<h3>Where to find:</h3>
				<ul>
					{queries[0].map(spot => {
						return (
							<li key={spot.id}>
								<h4>{spot.name}</h4>
								<h5>Organizers</h5>
								<ul>
									{findOrganizers(spot).map(organizer => {
										return <li key={organizer.id}>{organizer.name}</li>;
									})}
								</ul>
							</li>
						);
					})}
				</ul>
			</section>
		</article>
	);
}

Animal.propTypes = {
	index: PropTypes.number,
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
