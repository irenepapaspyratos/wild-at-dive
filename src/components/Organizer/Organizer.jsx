import PropTypes from 'prop-types';
import Button from '../ui/Button/Button.styled';
import Main from '../ui/Main/Main.styled';
import Card from '../ui/SingleElement/Card.styled.js';
import { useState } from 'react';
import useSWRConfig from 'swr';
import { useRouter } from 'next/router';
import ButtonSection from '../ui/Button/ButtonSection.styled';

export default function Organizer({ index, animals, organizers }) {
	const router = useRouter();
	const organizer = organizers[index];
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const { mutate } = useSWRConfig();

	return (
		<Main>
			<Card>
				<header>
					<h1>{organizer.name}</h1>
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
												return (
													spot.animalsRef.includes(animal.id) && animal
												);
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
								pathname: `/edit/spot/${organizer.id}`,
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
							const response = await fetch('/api/spot/' + organizer.id, {
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

Organizer.propTypes = {
	index: PropTypes.number,
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
