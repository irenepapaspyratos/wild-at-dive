import PropTypes from 'prop-types';
import Container from '../ui/Container/Container.styled';
import Navigation from '../Navigation/Navigation';
import Background from '../ui/Background/Background.styled';

export default function Layout({ children }) {
	return (
		<>
			<Background />
			<Container>
				<div>{children}</div>
				<Navigation />
			</Container>
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.element,
};
