import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
export default function Organizer({ index, spots, animals, organizers }) {
	const organizer = organizers[index];

	const findAnimals = spotToCheck => {
		const animalArray = spotToCheck.animals.map(animalId => {
			return animals.find(animal => animal.id === animalId);
		});
		return animalArray;
	};

	return (
		<article>
			<header>
				<h2>{organizer?.name}</h2>
			</header>

			<section>
				<h3>Description</h3>
				<p>{organizer?.description}</p>
			</section>

			<section>
				<h3>Where to find:</h3>
				<ul>
					{organizer?.spots.map(spot => {
						return (
							<li key={spot.name}>
								<h4>{spot.name}</h4>
								<h5>Friends to meet:</h5>
								<ul>
									{findAnimals(spot).map(animal => {
										return <li key={animal.id}>{animal.name}</li>;
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

Organizer.propTypes = {
	index: PropTypes.number,
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
