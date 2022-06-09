import styled, { css } from 'styled-components';

const Button = styled.button`
	border-radius: 2.5px;
	background: none;

	${({ variant }) =>
		variant == 'dropUp' &&
		css`
			border: none;
		`};

	${({ variant }) =>
		variant == 'dropUpSecond' &&
		css`
			border: none;
			background-image: radial-gradient(black 2%, transparent);
			margin-bottom: 0.5rem;
		`};

	${({ variant }) =>
		variant == 'dark' &&
		css`
			margin: 1rem;
			width: 7rem;
			height: 3rem;
			background-color: transparent;
			border: 1px solid var(--color-primary-light);
			border-radius: 2.5px;
			box-sizing: border-box;
			color: var(--color-primary-light);
			position: relative;

			&:hover,
			&:active {
				outline: 0;
			}

			&:hover {
				background-color: transparent;
				cursor: pointer;
			}

			&:before {
				background-color: #0d2748;
				content: '';
				height: calc(100% + 3px);
				position: absolute;
				right: -0.5rem;
				top: -0.6rem;
				transition: background-color 300ms ease-in;
				border-radius: 2.5px;
				width: 100%;
				z-index: -1;
			}
		`};
`;

export default Button;
