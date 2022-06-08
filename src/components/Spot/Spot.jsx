import PropTypes from 'prop-types';
import getStaticQueries from '../../services/get-staticQueries';
import Main from '../ui/Main/Main.styled';
import Card from '../ui/SingleElement/Card.styled.js';
import Button from '../ui/Button/Button.styled';
import { useState } from 'react';
import useSWRConfig from 'swr';
import { useRouter } from 'next/router';
import ButtonSection from '../ui/Button/ButtonSection.styled';
import Geotag from '../ui/SingleElement/Geotag.styled';
import GeotagSingle from '../ui/SingleElement/GeotagSingle.styled';

export default function Spot({ index, spots, animals, organizers }) {
	const router = useRouter();
	const spot = spots[index];
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const { mutate } = useSWRConfig();

	const queries = getStaticQueries('spot', spot, animals, organizers);

	return (
		<Main>
			<Card>
				<header>
					<h1>{spot.name}</h1>
					<h2>{spot.country}</h2>
				</header>

				<section>
					<h3>Geo-Tag</h3>
					<Geotag>
						<GeotagSingle>
							<h4>Latitude</h4>
							<p>{spot.geoTag.latitude}</p>
						</GeotagSingle>
						<GeotagSingle>
							<h4>Longitude</h4>
							<p>{spot.geoTag.longitude}</p>
						</GeotagSingle>
					</Geotag>
				</section>

				<section>
					<h3>Description</h3>
					<p>{spot.description}</p>
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
								pathname: `/edit/spot/${spot.id}`,
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
							const response = await fetch('/api/spot/' + spot.id, {
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

Spot.propTypes = {
	index: PropTypes.number,
	spots: PropTypes.array,
	animals: PropTypes.array,
	organizers: PropTypes.array,
};
