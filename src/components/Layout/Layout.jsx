import PropTypes from 'prop-types';
import Navigation from '../Navigation/Navigation';
import Container from '../ui/Container/Container.styled';

export default function Layout({ children }) {
	return (
		<>
			<Container>{children}</Container>
			<Navigation />
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.element,
};
