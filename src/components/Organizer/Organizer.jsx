import PropTypes from 'prop-types';

export default function Organizer({ index, animals, organizers }) {
	const organizer = organizers[index];

	return (
		<article>
			<header>
				<h2>{organizer.name}</h2>
			</header>

			<section>
				<h3>Description</h3>
				<p>{organizer.description}</p>
			</section>

			<section>
				<h3>Where to find:</h3>
				<ul>
					{organizer.spots.map(spot => {
						return (
							<li key={spot.name}>
								<h4>{spot.name}</h4>
								<h5>Friends to meet:</h5>
								<ul>
									{animals
										.filter(animal => {
											return spot.animalsRef.includes(animal.id) && animal;
										})
										.map(animal => (
											<li key={animal.id}>{animal.name}</li>
										))}
								</ul>
							</li>
						);
					})}
				</ul>
			</section>
		</article>
	);
}

Organizer.propTypes = {
	index: PropTypes.number,
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
