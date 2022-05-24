import useStore from '../src/lib/useStore';
import Spot from '../src/components/Spot/Spot';
import Animal from '../src/components/Animal/Animal';
import Organizer from '../src/components/Organizer/Organizer';
import ElementList from '../src/components/ElementList/ElementList';
import Map from '../src/components/Map/Map';
import { useEffect } from 'react';

export default function Home() {
	const dataStates = useStore(state => state.dataStates);
	const fetchData = useStore(state => state.fetchData);

	useEffect(() => {
		fetchData('spots');
		fetchData('animals');
		fetchData('organizers');
	}, []);

	return (
		<>
			<Spot
				spot={{ ...dataStates.spots[1] }}
				animals={dataStates.animals}
				organizers={dataStates.organizers}
			/>
			<Animal
				spots={dataStates.spots}
				animal={{ ...dataStates.animals[0] }}
				organizers={dataStates.organizers}
			/>
			<Organizer organizer={{ ...dataStates.organizers[2] }} animals={dataStates.animals} />
			<ElementList elements={dataStates.spots} header="Spots" />
			<ElementList elements={dataStates.animals} header="Animals" />
			<ElementList elements={dataStates.organizers} header="Organizers" />
			<Map />
		</>
	);
}
