import PropTypes from 'prop-types';
import Link from 'next/link';
import sluggify from '../../services/sluggify';
import useSWR from 'swr';

export default function ElementList({ identifier }) {
	const displayHeader = identifier.substr(0, 1).toUpperCase() + identifier.substr(1);
	const urlPart = identifier.substr(0, identifier.length - 1);
	const { data: data, errorData } = useSWR('/api/list/' + identifier);
	errorData && <h3>Error: {errorData.message}</h3>;

	return (
		<section>
			<details>
				<summary>{displayHeader}</summary>
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
										<a>{element.name}</a>
									</Link>
								</li>
							);
						})
					) : (
						<h1>loading ...</h1>
					)}
				</ul>
			</details>
		</section>
	);
}

ElementList.propTypes = {
	identifier: PropTypes.string,
};
