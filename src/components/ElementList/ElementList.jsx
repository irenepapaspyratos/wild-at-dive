import PropTypes from 'prop-types';
import Link from 'next/link';
import urlAdjustLight from '../../../src/services/url-adjust-light';

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
										pathname: `/list/${urlPart}/[slug]`,
										query: { slug: urlAdjustLight(element.name) },
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
