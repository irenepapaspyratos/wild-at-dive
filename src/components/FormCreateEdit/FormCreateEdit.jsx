import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useStore from '../../lib/hooks/useStore';
import Main from '../ui/Main/Main.styled';
import FieldsetCheckboxes from './FieldsetCheckboxes';
import Button from '../ui/Button/Button.styled.js';
import ButtonSection from '../ui/Button/ButtonSection.styled';
import Label from '../ui/Form/Label.styled';
import Input from '../ui/Form/Input.styled.js';

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

export default function FormCreateEdit({ keyValue, data, id }) {
	const router = useRouter();
	const [creationInput, setCreationInput] = useState(initialState);
	const checkedArrays = useStore(state => state.checkedArrays);
	const creationKey = keyValue + 's';
	const keyHeader = keyValue.substr(0, 1).toUpperCase() + keyValue.substr(1);

	useEffect(() => {
		if (id && creationInput === {}) {
			setCreationInput({
				...creationInput,
				idValue: id,
				nameValue: data[creationKey].name,
				countryValue: data[creationKey].country,
				geotagValue: data[creationKey].geotag,
				descriptionValue: data[creationKey].description,
				wikiValue: data[creationKey].wiki,
				spotsRefValue: data[creationKey].spotsRef,
				urlValue: data[creationKey].url,
				addressValue: data[creationKey].address,
				phoneValue: data[creationKey].phone,
				emailValue: data[creationKey].email,
				spotsValue: data[creationKey].spots,
				checkedRefsValue: data[creationKey].checkedArrays,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, setCreationInput]);

	const submit = async event => {
		event.preventDefault();

		if (!id) {
			console.log(
				'.......................................................................',
				data,
				checkedArrays,
				{
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
				}
			);
			const responseCreate = await fetch(`/api/${keyValue}/create`, {
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
					checkedRefs: checkedArrays,
				}),
			});
			const newEntry = await responseCreate.json();
			const newId = newEntry.entry._id;
			console.log(newEntry.entry.name);

			const response = await fetch(`/api/${keyValue}/` + newId, {
				method: 'PUT',
				body: JSON.stringify({
					newId: true,
					newName: newEntry.entry.name,
					checkedRefs: checkedArrays,
				}),
			});
			console.log(await response.json());
			event.target.reset();
		} else {
			const response = await fetch(`/api/${keyValue}/` + id, {
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
					checkedRefs: checkedArrays,
				}),
			});
			console.log(await response.json());
		}

		router.push(`/list`);
	};

	return (
		<Main>
			<h1>{keyHeader}</h1>
			<form onSubmit={submit}>
				{keyValue === 'spot' && (
					<>
						<fieldset>
							<legend>Spot</legend>
							<Label variant="main">
								Name
								<Input
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
							</Label>

							<Label variant="main">
								Country
								<Input
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
							</Label>

							<fieldset>
								<legend>GeoTag</legend>
								<Label>
									Latitude
									<Input
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
								</Label>
								<Label>
									Longitude
									<Input
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
								</Label>
							</fieldset>

							<Label variant="main">
								Description
								<Input
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
							</Label>

							<Label variant="main">
								Wikipedia-Url
								<Input
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
							</Label>
						</fieldset>

						<fieldset>
							<legend>Friends to meet:</legend>
							<FieldsetCheckboxes dataKey="animals" boxArray={data.animals} />
						</fieldset>

						<fieldset>
							<legend>Organizers:</legend>
							<FieldsetCheckboxes dataKey="organizers" boxArray={data.organizers} />
						</fieldset>
					</>
				)}

				{keyValue === 'animal' && (
					<>
						<fieldset>
							<legend>Animal</legend>
							<Label variant="main">
								Name
								<Input
									required
									placeholder=""
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
							</Label>

							<Label variant="main">
								Description
								<Input
									//required
									placeholder=""
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
							</Label>

							<Label variant="main">
								Wikipedia-Url
								<Input
									//required
									placeholder=""
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
							</Label>
						</fieldset>

						<fieldset>
							<legend>Where to find:</legend>
							<FieldsetCheckboxes dataKey="spots" boxArray={data.spots} />
						</fieldset>

						<fieldset>
							<legend>Organizers:</legend>
							<FieldsetCheckboxes dataKey="organizers" boxArray={data.organizers} />
						</fieldset>
					</>
				)}

				{keyValue === 'organizer' && (
					<>
						<fieldset>
							<legend>Organizer</legend>
							<Label variant="main">
								Name
								<Input
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
							</Label>

							<Label variant="main">
								Homepage
								<Input
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
							</Label>

							<Label variant="main">
								Description
								<Input
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
							</Label>

							<Label variant="main">
								Address
								<Input
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
							</Label>

							<Label variant="main">
								Email
								<Input
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
							</Label>

							<Label variant="main">
								Phone
								<Input
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
							</Label>
						</fieldset>

						<fieldset>
							<legend>Diving Spots:</legend>
							<FieldsetCheckboxes
								dataKey="spots"
								boxArray={data.spots}
								boxInBoxArray={data.animals}
							/>
						</fieldset>
					</>
				)}
				<ButtonSection>
					<Button type="submit" variant="dark">
						Submit
					</Button>

					<Button
						type="button"
						variant="dark"
						onClick={event => {
							event.preventDefault();
							Router.back();
						}}
					>
						Cancel
					</Button>
				</ButtonSection>
			</form>
		</Main>
	);
}

FormCreateEdit.propTypes = {
	keyValue: PropTypes.string,
	data: PropTypes.object,
	id: PropTypes.string,
};
