import PropTypes from 'prop-types';

export default function Organizer({ organizer, animals }) {
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
					{organizer.spots?.map(location => {
						const locname = location.name;
						return (
							<li key={location.name}>
								<h4>{locname}</h4>
								<h5>Friends to meet:</h5>
								<ul>
									{location.animals.map(animalRef => {
										const animalLoc = animals.find(animal => {
											return animalRef === animal.id && animal;
										});
										return <li key={animalLoc.id}>{animalLoc.name}</li>;
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
	organizer: PropTypes.object,
	animals: PropTypes.array,
};
