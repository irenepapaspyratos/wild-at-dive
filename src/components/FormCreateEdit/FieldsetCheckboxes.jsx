import PropTypes from 'prop-types';
import useStore from '../../lib/hooks/useStore';

export default function FieldsetCheckboxes({ dataKey, boxArray, boxInBoxArray }) {
	const updateCheckedArraysAdd = useStore(state => state.updateCheckedArraysAdd);
	const updateCheckedArraysCut = useStore(state => state.updateCheckedArraysCut);

	if (boxInBoxArray) {
		const dataKey2 = 'animals';
		let boxElement = '';
		return (
			<>
				{boxArray.map(element => (
					<div key={element.id}>
						<div>
							<input
								type="checkbox"
								id={element.id}
								name="chosenArray"
								value={element.id}
								onChange={event => {
									boxElement = element.id;
									if (event.target.checked) {
										updateCheckedArraysAdd(
											dataKey,
											element.name + '$$' + event.target.value
										);
									} else {
										updateCheckedArraysCut(
											dataKey,
											element.name + '$$' + event.target.value
										);
									}
								}}
							/>
							<label htmlFor={element.id}>{element.name}</label>
						</div>

						<fieldset>
							<legend>Which friends are visited:</legend>

							{boxInBoxArray.map(element => (
								<div key={element.id}>
									<input
										type="checkbox"
										id={element.id}
										name="chosenArray"
										value={element.id}
										onChange={event => {
											if (event.target.checked) {
												updateCheckedArraysAdd(
													dataKey2,
													boxElement + '$$' + event.target.value
												);
											} else {
												updateCheckedArraysCut(
													dataKey2,
													boxElement + '$$' + event.target.value
												);
											}
										}}
									/>
									<label htmlFor={element.id}>{element.name}</label>
								</div>
							))}
						</fieldset>
					</div>
				))}
			</>
		);
	}

	return (
		<>
			{boxArray.map(element => (
				<div key={element.id}>
					<input
						type="checkbox"
						id={element.id}
						name="chosenArray"
						value={element.id}
						onChange={event => {
							if (event.target.checked) {
								updateCheckedArraysAdd(dataKey, event.target.value);
							} else {
								updateCheckedArraysCut(dataKey, event.target.value);
							}
						}}
					/>
					<label htmlFor={element.id}>{element.name}</label>
				</div>
			))}
		</>
	);
}

FieldsetCheckboxes.propTypes = {
	boxArray: PropTypes.array,
	dataKey: PropTypes.string,
	boxInBoxArray: PropTypes.array,
};
