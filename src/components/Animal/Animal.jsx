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
							return animal.spotsRef.includes(spot.id) && spot.name;
						})
						.map(spot => {
							return (
								<li key={spot.id}>
									<h4>{spot.name}</h4>
									<h5>Organizers</h5>
									<ul>
										{organizers
											.filter(organizer => {
												const result = organizer.spots.find(location => {
													return (
														location.spotsRef.includes(spot.id) &&
														organizer
													);
												});
												return result && organizer;
											})
											.map(organizer => {
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

Spot.propTypes = {
	spots: PropTypes.array,
	animal: PropTypes.object,
	organizers: PropTypes.array,
};
