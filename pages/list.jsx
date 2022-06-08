import PropTypes from 'prop-types';
import useStore from '../src/lib/hooks/useStore';
import getDbData from '../src/services/get-dbData';
import { SWRConfig } from 'swr';
import swrFetcher from '../src/lib/db/swr-fetcher';
import Main from '../src/components/ui/Main/Main.styled';
import ElementList from '../src/components/ElementList/ElementList';

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

export default function ListAll({ fallback }) {
	const keyArray = useStore(state => state.keyArray);
	return (
		<Main>
			{keyArray.map(keyValue => {
				return (
					<SWRConfig key={keyValue} value={{ fetcher: swrFetcher, fallback }}>
						<ElementList key={keyValue} identifier={keyValue} />
					</SWRConfig>
				);
			})}
		</Main>
	);
}

ListAll.propTypes = {
	fallback: PropTypes.object,
};
