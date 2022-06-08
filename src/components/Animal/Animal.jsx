import PropTypes from 'prop-types';
import getStaticQueries from '../../services/get-staticQueries';
import Main from '../ui/Main/Main.styled';
import Card from '../ui/SingleElement/Card.styled.js';
import Button from '../ui/Button/Button.styled';
import { useState } from 'react';
import useSWRConfig from 'swr';
import { useRouter } from 'next/router';
import ButtonSection from '../ui/Button/ButtonSection.styled';

export default function Animal({ index, spots, animals, organizers }) {
	const router = useRouter();
	const animal = animals[index];
	const queries = getStaticQueries('animal', animal, spots, organizers);
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const { mutate } = useSWRConfig();

	const findOrganizers = spotToCheck => {
		const location = spots.find(spot => spot.id === spotToCheck.id);
		const spotQuery = getStaticQueries('spot', location, animals, organizers);
		return spotQuery[1];
	};

	return (
		<Main>
			<Card>
				<header>
					<h1>{animal.name}</h1>
				</header>

				<section>
					<h3>Description</h3>
					<p>{animal.description}</p>
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
			</Card>
			{!isDeleteMode ? (
				<ButtonSection>
					<Button
						type="button"
						variant="dark"
						onClick={() => {
							setIsDeleteMode(!isDeleteMode);
						}}
					>
						Delete
					</Button>
					<Button
						type="button"
						variant="dark"
						onClick={() => {
							router.push({
								pathname: `/edit/spot/${animal.id}`,
							});
						}}
					>
						Edit
					</Button>
				</ButtonSection>
			) : (
				<ButtonSection>
					<Button
						type="button"
						variant="dark"
						onClick={async () => {
							const response = await fetch('/api/spot/' + animal.id, {
								method: 'DELETE',
							});
							console.log(await response.json());
							mutate('/api/list/spot');
							router.push('/list');
						}}
					>
						!? REALLY ?!
					</Button>
					<Button
						type="button"
						variant="dark"
						onClick={() => {
							setIsDeleteMode(!isDeleteMode);
						}}
					>
						Cancel
					</Button>
				</ButtonSection>
			)}
		</Main>
	);
}

Animal.propTypes = {
	index: PropTypes.number,
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
