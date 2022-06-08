import styled from 'styled-components';

const Background = styled.div`
	width: 100vw;
	height: 100vh;
	background: url('/images/svg-background.svg');
	filter: brightness(50%);
	background-size: cover;
	position: fixed;
	top: 0;
	z-index: 9;
`;

export default Background;
