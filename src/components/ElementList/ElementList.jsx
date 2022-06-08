import PropTypes from 'prop-types';
import Link from 'next/link';
import ListSection from '../ui/ListSection/ListSection.styled';
import sluggify from '../../services/sluggify';
import useSWR from 'swr';
import IconSvg from '../IconSvg/IconSvg';

export default function ElementList({ identifier }) {
	const displayHeader = identifier.substr(0, 1).toUpperCase() + identifier.substr(1);
	const urlPart = identifier.substr(0, identifier.length - 1);
	const { data: data, errorData } = useSWR('/api/list/' + identifier);
	errorData && <h3>Error: {errorData.message}</h3>;

	return (
		<ListSection>
			<details>
				<summary>
					<h1>{displayHeader}</h1>
				</summary>
				<ul>
					{data ? (
						data.map(element => {
							return (
								<li key={element.id}>
									<Link
										href={{
											pathname: `/list/[key]/[name]`,
											query: {
												key: urlPart,
												name: sluggify(element.name),
												id: element.id,
											},
										}}
									>
										<a position="relative">
											{element.name}{' '}
											<IconSvg
												variant="arrow"
												color="#e3efff"
												size="14"
												margin="0.65rem 0 0 0.5rem"
												position="absolute"
											/>
										</a>
									</Link>
								</li>
							);
						})
					) : (
						<h1>loading ...</h1>
					)}
				</ul>
			</details>
		</ListSection>
	);
}

ElementList.propTypes = {
	identifier: PropTypes.string,
};
