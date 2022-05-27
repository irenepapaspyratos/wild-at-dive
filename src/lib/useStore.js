import create from 'zustand';
import getStaticData from '../services/get-staticData';

const useStore = create(set => ({
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
}));

export default useStore;
