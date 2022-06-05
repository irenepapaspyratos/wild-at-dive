import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useStore from '../../src/lib/hooks/useStore';
import getDbData from '../../src/services/get-dbData';
import { SWRConfig } from 'swr';
import swrFetcher from '../../src/lib/db/swr-fetcher';
import ElementList from '../../src/components/ElementList/ElementList';

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

export async function getStaticPaths() {
	return {
		paths: [
			{ params: { key: 'spots' } },
			{ params: { key: 'animals' } },
			{ params: { key: 'organizers' } },
		],
		fallback: false,
	};
}

export default function ListKey({ fallback }) {
	const router = useRouter();
	const keyArray = useStore(state => state.keyArray);
	const key = router.query.key;
	const keyValue = key && keyArray.includes(key) ? key : `${key}s`;

	return (
		key && (
			<SWRConfig key={keyValue} value={{ fetcher: swrFetcher, fallback }}>
				<ElementList key={keyValue} identifier={keyValue} />
			</SWRConfig>
		)
	);
}

ListKey.propTypes = {
	fallback: PropTypes.object,
};
