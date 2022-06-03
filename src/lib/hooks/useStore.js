import create from 'zustand';
import getStaticData from '../../services/get-staticData';

const useStore = create(set => ({
	keyArray: ['spots', 'animals', 'organizers'],
	dataStates: { spots: [], animals: [], organizers: [] },
	fetchData: async array => {
		let result = {};
		await array.forEach(key => {
			result = { ...result, [key]: getStaticData(key) };
		});
		set(state => {
			return { dataStates: { ...state.dataStates, ...result } };
		});
	},
	checkedArrays: { spots: [], animals: [], organizers: [] },
	updateCheckedArraysAdd: (key, element) => {
		set(state => {
			return {
				checkedArrays: {
					...state.checkedArrays,
					[key]: [...state.checkedArrays[key], element],
				},
			};
		});
	},
	updateCheckedArraysCut: (key, element) => {
		set(state => {
			const index = state.checkedArrays[key].findIndex(keyElement => keyElement === element);
			console.log(index, element);
			if (index !== -1) {
				return {
					checkedArrays: {
						...state.checkedArrays,
						[key]: [
							...state.checkedArrays[key].slice(0, index),
							...state.checkedArrays[key].slice(index + 1),
						],
					},
				};
			}
		});
	},
}));

export default useStore;

/*		set(state => {
			const index = state.checkedArrays[key].findIndex(({ id }) => id === element);
			
			if (index !== -1) {
				return {
					checkedArrays: {
						...state.checkedArrays,
						[key]: [
							...state.checkedArrays[key].slice(0, index),
							...state.checkedArrays[key].slice(index + 1),
						],
					},
				};
			}
		});
*/
