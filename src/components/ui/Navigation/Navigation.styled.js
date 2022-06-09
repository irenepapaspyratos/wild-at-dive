import styled from 'styled-components';

const NavigationStyle = styled.nav`
	height: 6rem;
	width: 100%;
	z-index: 100;
	background-image: ${props =>
		props.pathName === '/' ? 'none' : 'linear-gradient(to right, black,#000c1b)'};
	position: sticky;
	margin-top: 2rem;
	bottom: 0;
	padding-bottom: 1rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

export default NavigationStyle;
