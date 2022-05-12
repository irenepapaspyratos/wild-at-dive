import PropTypes from 'prop-types';

export default function Spot({ spots, animal, organizers }) {
	return (
		<article>
			<header>
				<h2>{animal.name}</h2>
			</header>

			<section>
				<h3>Description</h3>
				<p>{animal.description}</p>
			</section>

			<section>
				<h3>Where to find:</h3>
				<ul>
					{spots
						.filter(spot => {
							return animal.spots.includes(spot.name) && spot.name;
						})
						.map(spot => {
							return <li key={spot.id}>{spot.name}</li>;
						})}
				</ul>
			</section>

			<section>
				<h3>Organizers</h3>
				<ul>
					{organizers.map(organizer => {
						let varloc = false;
						organizer.spots.forEach(location => {
							varloc = location.animals.includes(animal.name);
						});
						return varloc && <li key={organizer.id}>{organizer.name}</li>;
					})}
				</ul>
			</section>
		</article>
	);
}

Spot.propTypes = {
	spots: PropTypes.array,
	animal: PropTypes.object,
	organizers: PropTypes.array,
};
