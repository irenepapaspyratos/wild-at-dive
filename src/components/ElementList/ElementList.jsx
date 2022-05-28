import PropTypes from 'prop-types';

export default function ElementList({ elements, header }) {
	return (
		<section>
			<h2>{header}</h2>
			<ul>
				{elements?.map(element => {
					return <li key={element.id}>{element.name}</li>;
				})}
			</ul>
		</section>
	);
}

ElementList.propTypes = {
	elements: PropTypes.array,
	header: PropTypes.string,
};
