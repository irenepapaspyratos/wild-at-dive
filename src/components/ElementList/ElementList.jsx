import PropTypes from 'prop-types';
import Link from 'next/link';
import sluggify from '../../services/sluggify';

export default function ElementList({ elements, header }) {
	const displayHeader = header.substr(0, 1).toUpperCase() + header.substr(1);
	const urlPart = header.substr(0, header.length - 1);

	return (
		<section>
			<details>
				<summary>{displayHeader}</summary>
				<ul>
					{elements.map(element => {
						return (
							<li key={element.id}>
								<Link
									href={{
										pathname: `/list/[key]/[name]`,
										query: { key: urlPart, name: sluggify(element.name) },
									}}
								>
									<a>{element.name}</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</details>
		</section>
	);
}

ElementList.propTypes = {
	elements: PropTypes.array,
	header: PropTypes.string,
};
