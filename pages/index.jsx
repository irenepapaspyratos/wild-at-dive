import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import getDbData from '../src/services/get-dbData';
import { SWRConfig } from 'swr';
import swrFetcher from '../src/lib/db/swr-fetcher';

const Map = dynamic(() => import('../src/components/Map/Map'), {
	ssr: false,
});

export async function getStaticProps() {
	const dataObject = await getDbData();
	const { spots, animals, organizers } = dataObject;

	return {
		props: {
			fallback: {
				'/api/list/spots': spots,
				'/api/list/animals': animals,
				'/api/list/organizers': organizers,
			},
		},
	};
}

export default function Home({ fallback }) {
	return (
		<SWRConfig value={{ fetcher: swrFetcher, fallback }}>
			<Map />
		</SWRConfig>
	);
}

Home.propTypes = {
	fallback: PropTypes.object,
};
