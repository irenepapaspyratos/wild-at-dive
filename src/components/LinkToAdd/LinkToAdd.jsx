import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import IconSvg from '../IconSvg/IconSvg';
import Button from '../../components/ui/Button/Button.styled';

export default function LinkToAdd({ color, size }) {
	const router = useRouter();
	const [dropUp, setDropUp] = useState(false);

	return (
		<>
			<Button
				type="button"
				variant="dropUp"
				aria-haspopup="menu"
				aria-expanded={dropUp ? 'true' : 'false'}
				onClick={() => setDropUp(prev => !prev)}
			>
				<span>
					<IconSvg variant="add" color={color} size={size} />
				</span>
			</Button>
			{dropUp && (
				<div className="dropUp">
					<ul>
						{['Spot', 'Animal', 'Organizer'].map((element, index) => {
							const urlPart = element.toLowerCase();
							return (
								<Button
									// eslint-disable-next-line react/no-array-index-key
									key={index}
									type="button"
									variant="dropUpSecond"
									onClick={() => {
										setDropUp(false);
										router.push(`/create/${urlPart}`);
									}}
								>
									<span>
										<IconSvg variant={urlPart} color={color} size={size} />
									</span>
								</Button>
							);
						})}
					</ul>
				</div>
			)}
		</>
	);
}

LinkToAdd.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number,
};
