import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useStore from '../../lib/hooks/useStore';
import FieldsetCheckboxes from './FieldsetCheckboxes';

import React from 'react';

const initialState = {
	nameValue: '',
	countryValue: '',
	geoTagValue: { latitude: '', longitude: '' },
	descriptionValue: '',
	wikiValue: '',
	spotsRefValue: [],
	urlValue: '',
	addressValue: '',
	phoneValue: '',
	emailValue: '',
	spotsValue: [
		{
			name: '',
			animalsRef: [],
			spotsRef: [],
		},
	],
};

export default function FormCreateEdit({ creationKey: creationKey }) {
	const router = useRouter();
	const [creationInput, setCreationInput] = useState(initialState);
	const checkedArrays = useStore(state => state.checkedArrays);

	useEffect(() => {
		if (router.isReady) {
			setCreationInput({
				...creationInput,
				nameValue: router.query.nameValue,
				countryValue: router.query.countryValue,
				geotagValue: router.query.geotagValue,
				descriptionValue: router.query.descriptionValue,
				wikiValue: router.query.wikiValue,
				spotsRefValue: router.query.spotsRefValue,
				urlValue: router.query.urlValue,
				addressValue: router.query.addressValue,
				phoneValue: router.query.phoneValue,
				emailValue: router.query.emailValue,
				spotsValue: router.query.spotsValue,
				checkedRefsValue: router.query.checkedArraysValue,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady, creationKey]);

	const keyArray = useStore(state => state.keyArray);
	const data = useStore(state => state.dataStates);
	const fetchData = useStore(state => state.fetchData);

	const submit = async event => {
		event.preventDefault();

		if (!router.query.nameValue) {
			console.log(checkedArrays);
			const response = await fetch(`/api/${creationKey}/create`, {
				method: 'POST',
				body: JSON.stringify({
					name: creationInput.nameValue,
					country: creationInput.countryValue,
					geoTag: creationInput.geoTagValue,
					description: creationInput.descriptionValue,
					wiki: creationInput.wikiValue,
					spotsRef: creationInput.spotsRefValue,
					url: creationInput.urlValue,
					address: creationInput.addressValue,
					phone: creationInput.phoneValue,
					email: creationInput.emailValue,
					spots: creationInput.spotsValue,
					checkedRefs: creationInput.checkedArraysValue,
				}),
			});
			console.log(await response.json());
		} else {
			const response = await fetch(`/api/${creationKey}/` + router.query.idValue, {
				method: 'PUT',
				body: JSON.stringify({
					name: creationInput.nameValue,
					country: creationInput.countryValue,
					geoTag: creationInput.geoTagValue,
					description: creationInput.descriptionValue,
					wiki: creationInput.wikiValue,
					spotsRef: creationInput.spotsRefValue,
					url: creationInput.urlValue,
					address: creationInput.addressValue,
					phone: creationInput.phoneValue,
					email: creationInput.emailValue,
					spots: creationInput.spotsValue,
					checkedRefs: creationInput.checkedArraysValue,
				}),
			});
			console.log(await response.json());
		}

		router.push(`/list/${creationKey}/`);
	};

	useEffect(() => {
		fetchData(keyArray);
	}, [fetchData, keyArray, data.animals]);

	return (
		<form onSubmit={submit}>
			{creationKey === 'spot' && (
				<>
					<fieldset>
						<legend>Spot</legend>
						<label>
							Name
							<input
								required
								placeholder="Barcelona Bay"
								type="text"
								name="nameSpot"
								label="nameSpot"
								value={creationInput.nameValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										nameValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Country
							<input
								//required
								placeholder="Spain"
								type="text"
								name="countrySpot"
								label="countrySpot"
								value={creationInput.countryValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										countryValue: event.target.value,
									});
								}}
							/>
						</label>

						<fieldset>
							<legend>GeoTag</legend>
							<label>
								Latitude
								<input
									required
									placeholder="41.382894"
									type="text"
									name="latitudeSpot"
									label="latitudeSpot"
									value={creationInput.geoTagValue.latitude}
									onChange={event => {
										setCreationInput({
											...creationInput,
											geoTagValue: {
												latitude: event.target.value,
												longitude: creationInput.geoTagValue.longitude,
											},
										});
									}}
								/>
							</label>
							<label>
								Longitude
								<input
									required
									placeholder="2.177432"
									type="text"
									name="longitudeSpot"
									label="longitudeSpot"
									value={creationInput.geoTagValue.longitude}
									onChange={event => {
										setCreationInput({
											...creationInput,
											geoTagValue: {
												latitude: creationInput.geoTagValue.latitude,
												longitude: event.target.value,
											},
										});
									}}
								/>
							</label>
						</fieldset>

						<label>
							Description
							<input
								//required
								placeholder="Barcelona is a city on the coast of northeastern Spain"
								type="text"
								name="descriptionSpot"
								label="descriptionSpot"
								value={creationInput.descriptionValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										descriptionValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Wikipedia-Url
							<input
								//required
								placeholder="https://en.wikipedia.org/wiki/Barcelona"
								type="text"
								name="wikiSpot"
								label="wikiSpot"
								value={creationInput.wikiValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										wikiValue: event.target.value,
									});
								}}
							/>
						</label>
					</fieldset>

					<fieldset>
						<legend>Friends to meet:</legend>
						<FieldsetCheckboxes dataKey={keyArray[1]} boxArray={data.animals} />
					</fieldset>

					<fieldset>
						<legend>Organizers:</legend>
						<FieldsetCheckboxes dataKey={keyArray[2]} boxArray={data.organizers} />
					</fieldset>
				</>
			)}

			{creationKey === 'animal' && (
				<>
					<fieldset>
						<legend>Animal</legend>
						<label>
							Name
							<input
								required
								placeholder="Icebear"
								type="text"
								name="nameAnimal"
								label="nameAnimal"
								value={creationInput.nameValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										nameValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Description
							<input
								//required
								placeholder="The polar bear is a hypercarnivorous bear whose native range lies largely within the Arctic Circle"
								type="text"
								name="descriptionAnimal"
								label="descriptionAnimal"
								value={creationInput.descriptionValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										descriptionValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Wikipedia-Url
							<input
								//required
								placeholder="https://en.wikipedia.org/wiki/Icebear"
								type="text"
								name="wikiAnimal"
								label="wikiAnimal"
								value={creationInput.wikiValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										wikiValue: event.target.value,
									});
								}}
							/>
						</label>
					</fieldset>

					<fieldset>
						<legend>Where to find:</legend>
						<FieldsetCheckboxes dataKey={keyArray[0]} boxArray={data.spots} />
					</fieldset>

					<fieldset>
						<legend>Organizers:</legend>
						<FieldsetCheckboxes dataKey={keyArray[2]} boxArray={data.organizers} />
					</fieldset>
				</>
			)}

			{creationKey === 'organizer' && (
				<>
					<fieldset>
						<legend>Organizer</legend>
						<label>
							Name
							<input
								required
								placeholder="Fantasy Diving"
								type="text"
								name="nameOrganizer"
								label="nameOrganizer"
								value={creationInput.nameValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										nameValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Homepage
							<input
								//required
								placeholder="https://fantasy-dive.es"
								type="text"
								name="urlOrganizer"
								label="urlOrganizer"
								value={creationInput.urlValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										urlValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Description
							<input
								//required
								placeholder="The polar bear is a hypercarnivorous bear whose native range lies largely within the Arctic Circle"
								type="text"
								name="descriptionAnimal"
								label="descriptionAnimal"
								value={creationInput.descriptionValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										descriptionValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Address
							<input
								//required
								placeholder="Bay Street3, 00100 Spain"
								type="text"
								name="addressOrganizer"
								label="adressOrganizer"
								value={creationInput.addressValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										addressValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Email
							<input
								// required
								placeholder="fantasy@diving.es"
								type="text"
								name="emailOrganizer"
								label="emailOrganizer"
								value={creationInput.emailValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										emailValue: event.target.value,
									});
								}}
							/>
						</label>

						<label>
							Phone
							<input
								// required
								placeholder="+11-2345-6789"
								type="text"
								name="phoneOrganizer"
								label="phoneOrganizer"
								value={creationInput.phoneValue}
								onChange={event => {
									setCreationInput({
										...creationInput,
										phoneValue: event.target.value,
									});
								}}
							/>
						</label>
					</fieldset>

					<fieldset>
						<legend>Diving Spots:</legend>
						<FieldsetCheckboxes
							dataKey={keyArray[0]}
							boxArray={data.spots}
							boxInBoxArray={data.animals}
						/>
					</fieldset>
				</>
			)}

			<button type="submit">Submit</button>

			<button
				type="button"
				onClick={event => {
					event.preventDefault();
					Router.back();
				}}
			>
				Cancel
			</button>
		</form>
	);
}

FormCreateEdit.propTypes = {
	creationKey: PropTypes.string,
};
