import Link from 'next/link';
import NavigationStyle from '../ui/Navigation/Navigation.styled';
import LinkToAdd from '../LinkToAdd/LinkToAdd';
import IconSvg from '../IconSvg/IconSvg';
import { useRouter } from 'next/router';

export default function Navigation() {
	const router = useRouter();

	return (
		<NavigationStyle path={router.pathname}>
			<Link hrefPass href="/">
				<a>
					<IconSvg variant="globe" size="35" color="#e3efff" />
				</a>
			</Link>
			<LinkToAdd size="35" color="#e3efff" />
			<Link hrefPass href="/list">
				<a>
					<IconSvg variant="list" size="35" color="#e3efff" />
				</a>
			</Link>
		</NavigationStyle>
	);
}
