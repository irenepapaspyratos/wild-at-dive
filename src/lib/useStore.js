import create from 'zustand';
import getStaticData from '../services/get-staticData';

const useStore = create(set => ({
	dataStates: { spots: [], animals: [], organizers: [] },
	fetchData: key => {
		set(state => {
			return { dataStates: { ...state.dataStates, [key]: getStaticData(key) } };
		});
	},
}));

export default useStore;
