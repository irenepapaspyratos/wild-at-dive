import styled, { css } from 'styled-components';

const Label = styled.label`
	${({ variant }) =>
		variant == 'main' &&
		css`
			display: flex;
			flex-direction: column;
			margin-bottom: 0.5rem;
		`};
`;

export default Label;
