import useStore from '../../../src/lib/hooks/useStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import urlAdjustLight from '../../../src/services/url-adjust-light';
import RenderIf from '../../../src/components/Global/RenderIf';
import Spot from '../../../src/components/Spot/Spot';
import Animal from '../../../src/components/Animal/Animal';
import Organizer from '../../../src/components/Organizer/Organizer';

export default function SingleListEntry() {
	const router = useRouter();
	const keyArray = useStore(state => state.keyArray);
	const data = useStore(state => state.dataStates);
	const fetchData = useStore(state => state.fetchData);
	const key = router.query.key;
	const keyS = `${key}s`;

	const indexFound = data[keyS]?.findIndex(element => {
		return urlAdjustLight(element.name) === router.query.name && element.id;
	});

	useEffect(() => {
		fetchData(keyArray);
	}, [fetchData, keyArray]);

	return (
		<>
			<RenderIf isTrue={key === 'spot'}>
				<Spot
					index={indexFound}
					spots={data.spots}
					animals={data.animals}
					organizers={data.organizers}
				/>
			</RenderIf>

			<RenderIf isTrue={key === 'animal'}>
				<Animal
					index={indexFound}
					spots={data.spots}
					animals={data.animals}
					organizers={data.organizers}
				/>
			</RenderIf>

			<RenderIf isTrue={key === 'organizer'}>
				<Organizer
					index={indexFound}
					spots={data.spots}
					animals={data.animals}
					organizers={data.organizers}
				/>
			</RenderIf>
		</>
	);
}
